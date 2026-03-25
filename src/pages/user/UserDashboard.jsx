import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, Loader } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const UserDashboard = () => {
  const [account, setAccount] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, txRes] = await Promise.all([
          api.get('/user/dashboard'),
          api.get('/user/transactions')
        ]);
        setAccount(accRes.data);
        setRecentTransactions(txRes.data.slice(0, 5)); // show latest 5
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {account?.holderName || 'User'}</h1>
          <p className="text-slate-500 mt-1">Here is what's happening with your accounts today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/user/transfer" className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[#153457] text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-colors">
            <Plus size={18} />
            Transfer Money
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Available Balance" value={account?.balance || 0} icon={Wallet} trend="up" trendValue="0.0%" />
        <StatCard title="Monthly Inflow" value={0.00} icon={ArrowDownRight} trend="up" trendValue="0.0%" />
        <StatCard title="Monthly Outflow" value={0.00} icon={ArrowUpRight} trend="down" trendValue="0.0%" />
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
          <Link to="/user/transactions" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Reference</th>
                <th className="px-6 py-3 font-medium">To/From</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => {
                const isCredit = tx.toAccount === account?.accountNumber;
                return (
                  <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">{new Date(tx.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">TX-{tx.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {isCredit ? `From: ${tx.fromAccount}` : `To: ${tx.toAccount}`}
                    </td>
                    <td className={`px-6 py-4 font-semibold text-right ${isCredit ? 'text-green-600' : 'text-slate-800'}`}>
                      {isCredit ? '+' : '-'}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </td>
                  </tr>
                );
              })}
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-slate-500">No recent transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
