import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Hash, AlertTriangle, ShieldCheck, Loader, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/admin/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleTamperUpdate = async (id, currentData) => {
    const newDataStr = prompt("Enter malicious new JSON payload to inject into this ledger record without fixing the hash:", currentData);
    if (newDataStr === null || newDataStr === currentData) return;
    
    try {
      await api.put(`/admin/tamper/${id}`, { newData: newDataStr });
      alert("Successfully maliciously modified log data! (Hash chain broken)");
      fetchLogs();
    } catch (err) {
      console.error(err);
      alert("Failed to tamper log data.");
    }
  };

  const handleTamperDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to secretly erase AuditLog ID ${id} to create a block gap in the chain?`)) return;
    try {
      await api.delete(`/admin/tamper/${id}`);
      alert("Successfully erased log! (Block sequence gap created)");
      fetchLogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete log.");
    }
  };

  const filteredLogs = logs.filter(l => 
    (l.changedBy || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (l.newData || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tamper Audit Ledger</h1>
          <p className="text-red-500 mt-1 font-semibold">WARNING: Authorized testing only. Tampering will trigger Auditor Integrity Flags.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-3" />
            <input
              type="text"
              placeholder="Search logs by user or data payload..."
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
                <th className="px-6 py-4 font-semibold">Block ID</th>
                <th className="px-6 py-4 font-semibold">User / Scope</th>
                <th className="px-6 py-4 font-semibold">Data Payload</th>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Sequence Hash</th>
                <th className="px-6 py-4 font-semibold text-right">Tamper Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-sm">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">CTX-{log.id}</div>
                    <div className="text-xs text-blue-600 mt-1">{log.operation} {log.tableName}</div>
                  </td>
                  <td className="px-6 py-4 font-sans text-slate-800 font-medium">
                    {log.changedBy}
                  </td>
                  <td className="px-6 py-4 font-sans text-slate-600 truncate max-w-[200px]">
                    {log.newData || '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(log.timestamp || log.changedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded text-slate-600 w-fit cursor-pointer hover:bg-slate-200" title={log.rowHash}>
                      <Hash size={12} />
                      {log.rowHash ? log.rowHash.substring(0, 8) + '...' : 'Missing'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                         onClick={() => handleTamperUpdate(log.id, log.newData)}
                         className="p-1.5 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded transition-colors"
                         title="Modify Data (Break Hash)"
                       >
                         <Edit size={16} />
                       </button>
                       <button 
                         onClick={() => handleTamperDelete(log.id)}
                         className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors"
                         title="Erase Record (Break Chain sequence)"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-sans">
                    No block entries found. Make a user transfer to start logging!
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

export default AdminAuditLogs;
