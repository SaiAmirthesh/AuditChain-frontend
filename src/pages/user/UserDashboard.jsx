import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, Loader, Sparkles } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const UserDashboard = () => {
  const [account, setAccount] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [hasFetchedAi, setHasFetchedAi] = useState(false);
  const [isAiShrink, setIsAiShrink] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  const fetchAI = async () => {
      try {
          setAiLoading(true);
          setHasFetchedAi(true);
          const res = await api.get('/user/ai-insights');
          setAiInsight(res.data);
      } catch (err) {
          setAiInsight("AI Assistant is currently offline.");
      } finally {
          setAiLoading(false);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, txRes, analyticRes] = await Promise.all([
          api.get('/user/dashboard'),
          api.get('/user/transactions'),
          api.get('/user/analytics')
        ]);
        setAccount(accRes.data);
        setRecentTransactions(txRes.data.content || []); // Use .content
        setAnalytics(analyticRes.data);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Welcome back, {account?.account?.holderName || 'User'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Here is what's happening with your accounts today.</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Link to="/user/transfer" className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[#153457] text-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-all hover:scale-102">
            <Plus size={16} />
            Transfer Money
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard title="Available Balance" value={account?.account?.balance || 0} icon={Wallet} trend="up" trendValue="0.0%" format="currency" />
        <StatCard title="Monthly Inflow" value={account?.totalIncome || 0.00} icon={ArrowDownRight} trend="up" trendValue="+" format="currency" />
        <StatCard title="Monthly Outflow" value={account?.totalExpense || 0.00} icon={ArrowUpRight} trend="down" trendValue="-" format="currency" />
      </div>

      {/* AI Advisor Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                    <Sparkles size={20} className="text-blue-200" />
                </div>
                <h2 className="text-lg font-bold tracking-tight">Personal Banker AI Insight</h2>
            </div>
            
            {!hasFetchedAi ? (
                <button 
                    onClick={fetchAI}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all border border-white/10 backdrop-blur-md flex items-center gap-2"
                >
                    <Sparkles size={16} /> Generate AI Financial Advice
                </button>
            ) : aiLoading ? (
                <div className="flex items-center gap-3 animate-pulse text-blue-100">
                    <Loader className="animate-spin" size={16} />
                    <span className="text-sm font-medium italic">Analyzing your spending habits...</span>
                </div>
            ) : (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                    <p className={`text-sm leading-relaxed text-blue-50 font-medium italic transition-all duration-300 ${isAiShrink ? 'line-clamp-2' : ''}`}>
                        {aiInsight.replace(/[\[\]*]/g, '').trim()}
                    </p>
                    <button 
                        onClick={() => setIsAiShrink(!isAiShrink)}
                        className="mt-3 text-[10px] font-bold uppercase tracking-wider text-blue-300 hover:text-white transition-colors"
                    >
                        {isAiShrink ? 'Read More' : 'Show Less'}
                    </button>
                </div>
            )}
        </div>
      </motion.div>
      
      {/* Spending Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
            <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                Spending Distribution
            </h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={analytics?.categorySpending || []}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="amount"
                            nameKey="category"
                            label={(entry) => `₹${entry.amount.toFixed(2)}`}
                        >
                            {(analytics?.categorySpending || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'][index % 5]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value) => `₹${value.toFixed(2)}`}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-center"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 -mr-10 -mt-10">
                <Wallet size={160} />
            </div>
            <div className="relative z-10">
                <h3 className="text-indigo-200 uppercase text-[10px] font-bold tracking-[0.2em] mb-2">Financial Summary</h3>
                <p className="text-2xl font-bold mb-6 italic leading-relaxed">
                   "Your spending is highest in <span className="text-rose-400">{(analytics?.categorySpending?.sort((a,b) => b.amount - a.amount)[0]?.category) || "General"}</span> this month."
                </p>
                <div className="flex gap-8">
                    <div>
                        <span className="block text-[10px] text-indigo-400 uppercase font-bold tracking-widest mb-1">Total Impact</span>
                        <span className="text-xl font-bold">₹{account?.totalExpense?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-sm font-bold text-slate-800">Recent Transactions</h2>
          <Link to="/user/transactions" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
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
                const isCredit = tx.toAccount === account?.account?.accountNumber;
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
