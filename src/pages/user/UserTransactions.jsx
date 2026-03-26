import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Download, Loader } from 'lucide-react';
import api from '../../services/api';

const UserTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAcc, setUserAcc] = useState('');

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const [accRes, txRes] = await Promise.all([
          api.get('/user/dashboard'),
          api.get('/user/transactions')
        ]);
        setUserAcc(accRes.data.accountNumber);
        setTransactions(txRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTx();
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
          <h1 className="text-xl font-bold text-slate-800">Transactions</h1>
          <p className="text-xs text-slate-500 mt-0.5">View and search your complete transaction history.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3.5 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-3" />
            <input
              type="text"
              placeholder="Search by account or ID..."
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
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Reference</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tx) => {
                const isCredit = tx.toAccount === userAcc;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">{new Date(tx.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">TX-{tx.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {isCredit ? `From: ${tx.fromAccount}` : `To: ${tx.toAccount}`}
                    </td>
                    <td className={`px-6 py-4 font-bold text-right ${isCredit ? 'text-green-600' : 'text-slate-800'}`}>
                      {isCredit ? '+' : '-'}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserTransactions;
