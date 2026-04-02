import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Hash, AlertTriangle, ShieldCheck, Loader } from 'lucide-react';
import api from '../../services/api';
import Pagination from '../../components/Pagination';

const AuditorLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/auditor/logs?page=${currentPage}&size=10`);
        setLogs(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [currentPage]);

  const filteredLogs = logs.filter(l => 
    (l.action || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (l.details || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Immutable Audit Logs</h1>
        <p className="text-slate-500 mt-1">Direct read-only access to cryptographic system events.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-3" />
            <input
              type="text"
              placeholder="Search logs by action or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0A2540] text-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Log ID</th>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Hash Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-sm">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">CTX-{log.id}</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">{log.operation} {log.tableName}</td>
                  <td className="px-6 py-4 font-sans text-slate-600 truncate max-w-[200px]">
                    {log.newData || '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(log.changedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded text-slate-600 w-fit cursor-pointer hover:bg-slate-200" title={log.rowHash}>
                      <Hash size={12} />
                      {log.rowHash ? log.rowHash.substring(0, 10) + '...' : 'Unverified'}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-sans">
                    No system log entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </motion.div>
  );
};

export default AuditorLogs;
