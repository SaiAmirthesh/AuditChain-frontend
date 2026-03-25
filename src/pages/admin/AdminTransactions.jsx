import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader } from 'lucide-react';
import api from '../../services/api';

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTxs = async () => {
      try {
        const res = await api.get('/admin/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTxs();
  }, []);

  const filtered = transactions.filter(t => 
    (t.fromAccount || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.toAccount || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(t.id).includes(searchTerm)
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Transactions</h1>
          <p className="text-slate-500 mt-1">Global view of all system transfers and payments.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-3" />
            <input
              type="text"
              placeholder="Search by ID, from account, or to account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Tx ID / Date</th>
                <th className="px-6 py-4 font-semibold">From Account</th>
                <th className="px-6 py-4 font-semibold">To Account</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-blue-600">TX-{tx.id}</div>
                    <div className="text-xs text-slate-500">{new Date(tx.timestamp).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{tx.fromAccount}</td>
                  <td className="px-6 py-4 text-slate-600">{tx.toAccount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-right text-slate-800">
                    {tx.amount ? tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No matching transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminTransactions;
