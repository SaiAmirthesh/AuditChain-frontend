import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../../components/StatCard';
import { Users, DollarSign, AlertCircle, Loader, Cpu, BarChart3, Database } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tamperStatus, setTamperStatus] = useState('');
  const [aiIntelligence, setAiIntelligence] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [hasFetchedAi, setHasFetchedAi] = useState(false);
  const [isAiShrink, setIsAiShrink] = useState(true);
  const [maintenanceStatus, setMaintenanceStatus] = useState('');

  const fetchAI = async () => {
    try {
        setAiLoading(true);
        setHasFetchedAi(true);
        const res = await api.get('/admin/ai-intelligence');
        setAiIntelligence(res.data);
    } catch (err) {
        setAiIntelligence("Intelligence module currently syncing...");
    } finally {
        setAiLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [dashRes, accRes, txRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/accounts'),
          api.get('/admin/transactions?page=0&size=10')
        ]);
        setData(dashRes.data);
        setAccounts(accRes.data);
        setTransactions(txRes.data.content || []); // Use .content from Page object
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

  const handleMaintenance = async () => {
    try {
      setMaintenanceStatus('Recalibrating...');
      await api.post('/admin/maintenance');
      setMaintenanceStatus('Maintenance Complete: Anomalies & Risk scores updated.');
      setTimeout(() => setMaintenanceStatus(''), 5000);
      // Refresh AI intelligence to reflect changes
      const res = await api.get('/admin/ai-intelligence');
      setAiIntelligence(res.data);
    } catch (err) {
      console.error(err);
      setMaintenanceStatus('Maintenance Failed');
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">AuditChain global metrics and user activity.</p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-4">
          {(tamperStatus || maintenanceStatus) && (
            <span className="text-xs text-blue-600 font-bold animate-pulse px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                {tamperStatus || maintenanceStatus}
            </span>
          )}
          <button 
            onClick={handleMaintenance}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Cpu size={14} /> Recalibrate System
          </button>
          <button 
            onClick={handleTamper}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors border border-red-200 shadow-sm"
          >
            Tamper Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatCard title="Number of Users" value={totalUsers} icon={Users} trend="up" trendValue="+" format="number" />
        <StatCard title="Total Volume" value={totalVolume} icon={DollarSign} trend="up" trendValue="+" format="currency" />
        <StatCard title="System Alerts" value={0} icon={AlertCircle} trend="down" trendValue="0" format="number" />
      </div>

      {/* AI Intelligence Sector */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 relative overflow-hidden"
      >
          <div className="absolute top-0 right-0 p-8 text-blue-500/5">
              <BarChart3 size={200} />
          </div>
          <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <BarChart3 size={18} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm">System Intelligence Report</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Generative Analysis • Real-time</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-400 uppercase tracking-tighter">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                   AI Engine Online
                </div>
              </div>

              {!hasFetchedAi ? (
                <button 
                    onClick={fetchAI}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2 w-fit"
                >
                    <BarChart3 size={14} /> Run Intelligence Analysis
                </button>
              ) : aiLoading ? (
                <div className="space-y-3">
                    <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
                </div>
              ) : (
                <div className="bg-white/5 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                    <p className={`text-slate-300 text-sm leading-relaxed font-medium transition-all duration-300 ${isAiShrink ? 'line-clamp-2' : ''}`}>
                        {aiIntelligence.replace(/[\[\]*]/g, '').trim()}
                    </p>
                    <button 
                        onClick={() => setIsAiShrink(!isAiShrink)}
                        className="mt-3 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors"
                    >
                        {isAiShrink ? 'Expand Intelligence' : 'Collapse'}
                    </button>
                </div>
              )}
          </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Span: Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-sm font-bold text-slate-800">Recent Transactions</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-3">Tx ID</th>
                  <th className="px-5 py-3">From</th>
                  <th className="px-5 py-3">To</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-[11px] text-blue-600">TX-{tx.id}</td>
                    <td className="px-5 py-3 font-semibold text-slate-700">{tx.fromAccount}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{tx.toAccount}</td>
                    <td className="px-5 py-3 font-bold text-slate-900 text-right">
                      {tx.amount ? tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00'}
                    </td>
                  </tr>
                ))}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-400 text-xs">No transactions recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Span: Users List */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/30">
            <h2 className="text-sm font-bold text-slate-800">All Users</h2>
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
