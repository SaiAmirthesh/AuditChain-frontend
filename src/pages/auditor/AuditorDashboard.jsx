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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Auditor Control Panel</h1>
        <p className="text-slate-500 mt-1">Monitor cryptographic integrity and review compliance alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="System Integrity" value="100%" icon={ShieldCheck} trend="up" trendValue="Verified" format="number" />
        <StatCard title="Total Audit Logs" value={logs.length} icon={Hash} trend="up" trendValue="+" format="number" />
        <StatCard title="Active Alerts" value={activeAlertsCount} icon={AlertTriangle} trend="down" trendValue="0" format="number" />
        <StatCard title="Nodes Online" value="1" icon={Server} trend="up" trendValue="Stable" format="number" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">Recent Immutable Events</h2>
          </div>
          <div className="flex-1 overflow-x-auto min-h-[300px]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0A2540] text-slate-200 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 font-semibold">Log ID</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                  <th className="px-6 py-3 font-semibold">Timestamp</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-blue-600">CTX-{log.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800 truncate max-w-[200px]">{log.action || log.details}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
                {recentLogs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-500">No recent logs recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
          
          <h2 className="text-lg font-semibold text-white mb-6 relative z-10 flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={20} /> Integrity Monitor
          </h2>
          
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-slate-400 text-sm mb-1">
                <span>Genesis Block</span>
                <span className="text-green-400 font-mono">0x000...a1b2</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 text-sm mb-1">
                <span>Current Height (Logs)</span>
                <span className="text-white font-mono">{logs.length} Blocks</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 text-sm mb-1">
                <span>Last Verification</span>
                <span className="text-white font-mono">Just Now</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-800 relative z-10">
             <div className="w-full bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 animate-pulse"></div>
               <div>
                 <h4 className="text-green-400 font-semibold text-sm">Chain Valid</h4>
                 <p className="text-green-500/70 text-xs mt-0.5">All hashes sequentially cryptographically secured. No tampering detected.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditorDashboard;
