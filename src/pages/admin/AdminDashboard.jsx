import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../../components/StatCard';
import { Users, DollarSign, AlertCircle, Loader } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tamperStatus, setTamperStatus] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [dashRes, accRes, txRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/accounts'),
          api.get('/admin/transactions')
        ]);
        setData(dashRes.data);
        setAccounts(accRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleTamper = async () => {
    try {
      setTamperStatus('Tampering...');
      await api.post('/admin/tamper');
      setTamperStatus('Tampered Successfully! (Run Auditor Verification)');
      setTimeout(() => setTamperStatus(''), 5000);
    } catch (err) {
      console.error(err);
      setTamperStatus('Failed to tamper');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-blue-600" size={32} /></div>;
  }

  // Use explicit array calculations for exactness in UI
  const recentTransactions = transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
  const totalVolume = transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0);
  const totalUsers = accounts.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">AuditChain global metrics and user activity.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          {tamperStatus && <span className="text-red-600 font-bold animate-pulse">{tamperStatus}</span>}
          <button 
            onClick={handleTamper}
            className="px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg shadow-sm transition-colors border border-red-300"
          >
            Modify Database (Tamper Test)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Number of Users" 
          value={totalUsers} 
          icon={Users} 
          trend="up" 
          trendValue="+" 
          format="number"
        />
        <StatCard 
          title="Total Transaction Amount" 
          value={totalVolume} 
          icon={DollarSign} 
          trend="up" 
          trendValue="+" 
          format="currency"
        />
        <StatCard 
          title="System Alerts" 
          value={0} 
          icon={AlertCircle} 
          trend="down" 
          trendValue="0" 
          format="number"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Span: Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 font-semibold">Tx ID</th>
                  <th className="px-6 py-3 font-semibold">From</th>
                  <th className="px-6 py-3 font-semibold">To</th>
                  <th className="px-6 py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs text-blue-600">TX-{tx.id}</td>
                    <td className="px-6 py-3 font-medium text-slate-800">{tx.fromAccount}</td>
                    <td className="px-6 py-3 text-slate-600">{tx.toAccount}</td>
                    <td className="px-6 py-3 font-bold text-slate-800 text-right">
                      {tx.amount ? tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00'}
                    </td>
                  </tr>
                ))}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-500">No recent transactions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Span: Users List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">All Users</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <ul className="divide-y divide-slate-100">
              {accounts.map((user) => (
                <li key={user.id} className="p-4 hover:bg-slate-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {(user.holderName || user.accountNumber || 'U').charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-medium text-slate-800 truncate">{user.holderName || user.accountNumber}</div>
                    <div className="text-xs text-slate-500">
                      Balance: {user.balance ? user.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00'}
                    </div>
                  </div>
                </li>
              ))}
              {accounts.length === 0 && (
                <li className="p-6 text-center text-slate-500">No users found.</li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AdminDashboard;
