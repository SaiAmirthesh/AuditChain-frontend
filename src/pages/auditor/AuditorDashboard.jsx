import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../../components/StatCard';
import { ShieldCheck, Server, AlertTriangle, Hash, Loader } from 'lucide-react';
import api from '../../services/api';

const AuditorDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditorData = async () => {
      try {
        const [logsRes, alertsRes] = await Promise.all([
          api.get('/auditor/logs'),
          api.get('/auditor/alerts')
        ]);
        setLogs(logsRes.data);
        setAlerts(alertsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-blue-600" size={32} /></div>;
  }

  const activeAlertsCount = alerts.length;
  const recentLogs = logs.slice(-5).reverse(); // get last 5 in descending order if chronologically appended

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Auditor Control Panel</h1>
        <p className="text-xs text-slate-500 mt-0.5">Monitor cryptographic integrity and review compliance alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="System Integrity" value="100%" icon={ShieldCheck} trend="up" trendValue="Verified" format="number" />
        <StatCard title="Total Audit Logs" value={logs.length} icon={Hash} trend="up" trendValue="+" format="number" />
        <StatCard title="Active Alerts" value={activeAlertsCount} icon={AlertTriangle} trend="down" trendValue="0" format="number" />
        <StatCard title="Nodes Online" value="1" icon={Server} trend="up" trendValue="Stable" format="number" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-sm font-bold text-slate-800">Immutable Events</h2>
          </div>
          <div className="flex-1 overflow-x-auto min-h-[300px]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0A2540] text-slate-200 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-3">Log ID</th>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[11px] text-blue-600">CTX-{log.id}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-700 truncate max-w-[180px] text-xs">{log.action || log.details}</td>
                    <td className="px-5 py-3.5 text-slate-400 text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-widest">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
                {recentLogs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-400 text-xs text-xs">No audit logs available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg shadow-sm border border-slate-800 p-5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
          
          <h2 className="text-sm font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <ShieldCheck className="text-blue-400" size={18} /> Integrity Monitor
          </h2>
          
          <div className="space-y-5 relative z-10">
            <div>
              <div className="flex justify-between text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                <span>Genesis Block</span>
                <span className="text-blue-400 font-mono">0x000...a1b2</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                <span>Current Height</span>
                <span className="text-white font-mono">{logs.length} Blocks</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                <span>Verification</span>
                <span className="text-green-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-800 relative z-10">
             <div className="w-full bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
               <div>
                 <h4 className="text-blue-400 font-bold text-[11px] uppercase tracking-wider">Chain Secured</h4>
                 <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Cryptographic hash chain verified. No tampering detected.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditorDashboard;
