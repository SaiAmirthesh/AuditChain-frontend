import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Info, AlertTriangle, AlertOctagon, Loader } from 'lucide-react';
import api from '../../services/api';

const AuditorAlerts = () => {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/auditor/alerts');
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

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
          <h1 className="text-2xl font-bold text-slate-800">System Alerts</h1>
          <p className="text-slate-500 mt-1">Review security events, anomalies, and system notifications.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex border border-slate-200 rounded-lg overflow-hidden shrink-0">
          {['all', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600 hover:bg-slate-50 border-l border-slate-200 first:border-l-0'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((alert) => {
          // Compute a dynamic severity if missing, since Alert.java has no severity prop
          const msg = (alert.alertMessage || '').toUpperCase();
          const severity = (msg.includes('BROKEN') || msg.includes('MODIFIED')) ? 'high' : 'medium';
          
          if (filter !== 'all' && filter !== severity) return null;
          
          return (
          <div key={alert.id} className={`p-5 rounded-xl border flex items-start gap-4 ${
            severity === 'high' ? 'bg-red-50 border-red-200' :
            severity === 'medium' ? 'bg-orange-50 border-orange-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className={`p-2 rounded-full mt-0.5 ${
              severity === 'high' ? 'bg-red-100 text-red-600' :
              severity === 'medium' ? 'bg-orange-100 text-orange-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {severity === 'high' ? <AlertOctagon size={24} /> :
               severity === 'medium' ? <AlertTriangle size={24} /> :
               <Info size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-1">
                <h3 className={`text-lg font-bold ${
                  severity === 'high' ? 'text-red-900' :
                  severity === 'medium' ? 'text-orange-900' :
                  'text-blue-900'
                }`}>System Integrity Alert #{alert.id}</h3>
                
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap w-fit ${
                  severity === 'high' ? 'bg-red-100 text-red-800' :
                  severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>{alert.status || 'UNRESOLVED'}</span>
              </div>
              <p className={`mb-3 font-semibold ${
                severity === 'high' ? 'text-red-700' :
                severity === 'medium' ? 'text-orange-800' :
                'text-blue-800'
              }`}>{alert.alertMessage}</p>
            </div>
          </div>
          );
        })}
        {alerts.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-xl text-slate-500">
            No alerts found for this filter category. (System is secure)
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuditorAlerts;
