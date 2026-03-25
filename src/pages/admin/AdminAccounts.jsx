import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader } from 'lucide-react';
import api from '../../services/api';

const AdminAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get('/admin/accounts');
        setAccounts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const filtered = accounts.filter(acc => 
    (acc.holderName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (acc.accountNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-800">Account Management</h1>
          <p className="text-slate-500 mt-1">Manage system accounts, roles, and statuses.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-3" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Account Details (Name/Number)</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Balance</th>
                <th className="px-6 py-4 font-semibold">Joined / DB Entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                        {(acc.holderName || acc.accountNumber || 'U').charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{acc.holderName || acc.accountNumber}</div>
                        <div className="text-slate-500 text-xs text-mono">{acc.accountNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      User
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {acc.balance ? acc.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">Database Entry Id #{acc.id}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No matching accounts found
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

export default AdminAccounts;
