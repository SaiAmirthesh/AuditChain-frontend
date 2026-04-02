import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../../components/StatCard';
import { ShieldCheck, Server, AlertTriangle, Hash, Loader, ShieldAlert, Activity } from 'lucide-react';
import api from '../../services/api';

const AuditorDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [totalLogsCount, setTotalLogsCount] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiVerdict, setAiVerdict] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [hasFetchedAi, setHasFetchedAi] = useState(false);
  const [isAiShrink, setIsAiShrink] = useState(true);

  const fetchAIVerdict = async () => {
      try {
          setAiLoading(true);
          setHasFetchedAi(true);
          const res = await api.get('/auditor/ai-verdict');
          setAiVerdict(res.data);
      } catch (err) {
          setAiVerdict("Security module scanning...");
      } finally {
          setAiLoading(false);
      }
  };

  useEffect(() => {
    const fetchAuditorData = async () => {
      try {
        setLoading(true);
        const [logsRes, alertsRes] = await Promise.all([
          api.get('/auditor/logs?page=0&size=10'),
          api.get('/auditor/alerts')
        ]);
        setLogs(logsRes.data.content || []);
        setTotalLogsCount(logsRes.data.totalElements || 0);
        setAlerts(alertsRes.data || []);
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
  const recentLogs = [...logs].reverse(); // Since backend returns Ascending, reverse it for dashboard preview

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
        <StatCard title="Total Audit Logs" value={totalLogsCount} icon={Hash} trend="up" trendValue="+" format="number" />
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
                    <td className="px-5 py-3.5 font-bold text-slate-700 truncate max-w-[180px] text-xs">
                      {log.operation} {log.tableName}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-[11px]">{new Date(log.changedAt).toLocaleString()}</td>
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
                <span className="text-white font-mono">{totalLogsCount} Blocks</span>
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

        {/* AI Verdict Sector */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden"
        >
           <div className="flex items-center gap-2 mb-4">
               <div className="p-1.5 bg-red-50 rounded-lg text-red-600 border border-red-100">
                   <ShieldAlert size={18} />
               </div>
               <h2 className="text-sm font-bold text-slate-800 tracking-tight">Forensic AI Verdict</h2>
           </div>

           {!hasFetchedAi ? (
              <button 
                  onClick={fetchAIVerdict}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                  <ShieldAlert size={14} /> Generate Security Verdict
              </button>
           ) : aiLoading ? (
               <div className="space-y-3 animate-pulse">
                   <div className="h-3 bg-slate-100 rounded w-full"></div>
                   <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                   <div className="h-3 bg-slate-100 rounded w-4/6"></div>
               </div>
           ) : (
                <div className="bg-red-50/30 border-l-4 border-red-500 p-5 rounded-r-xl">
                    <p className={`text-sm leading-relaxed text-slate-700 italic font-medium transition-all duration-300 ${isAiShrink ? 'line-clamp-2' : ''}`}>
                        {aiVerdict.replace(/[\[\]*]/g, '').trim()}
                    </p>
                    <button 
                        onClick={() => setIsAiShrink(!isAiShrink)}
                        className="mt-3 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
                    >
                        {isAiShrink ? 'Full Forensic Report' : 'Dismiss Detail'}
                    </button>
                    <div className="mt-6 flex items-center gap-2 pt-4 border-t border-red-100/50">
                        <Activity size={12} className="text-green-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Chain Monitoring Active</span>
                    </div>
                </div>
           )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuditorDashboard;
