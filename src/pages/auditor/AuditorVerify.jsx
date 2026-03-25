import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Search, Loader, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import api from '../../services/api';

const AuditorVerify = () => {
  const [verifying, setVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [resultStrings, setResultStrings] = useState([]);
  
  const progressBarRef = useRef(null);
  const scanLineRef = useRef(null);
  
  const startVerification = async () => {
    setVerifying(true);
    setCompleted(false);
    setProgress(0);
    setResultStrings([]);
    
    // Animate progress bar simulating processing while we await backend
    if (progressBarRef.current) {
        gsap.to(progressBarRef.current, { width: '90%', duration: 2, ease: "power1.inOut" });
    }
    if (scanLineRef.current) {
        gsap.fromTo(scanLineRef.current, 
            { y: 0, opacity: 0.5 }, 
            { y: 200, opacity: 0.8, duration: 1.5, repeat: -1, yoyo: true, ease: "linear" }
        );
    }

    try {
        const res = await api.get('/auditor/verify');
        setResultStrings(res.data);
        
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, { width: '100%', duration: 0.5, onComplete: () => {
                setVerifying(false);
                setCompleted(true);
                gsap.killTweensOf(scanLineRef.current);
            }});
        }
    } catch (err) {
        console.error(err);
        setVerifying(false);
        setCompleted(true);
        setResultStrings(["ERROR: Verification node disconnected or failed."]);
        gsap.killTweensOf(scanLineRef.current);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Verify Cryptographic Chain</h1>
        <p className="text-slate-500 mt-1">Initiate a full recalculation of SHA-256 block hashes to prove database immutability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Verification Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
            <Cpu size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Initiate Full Scan</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            This module will query the core database, retrieve every transaction hash sequence, and recalculate them starting from the Genesis block.
            Any tampering will break the cryptographic link and trigger an immediate system halt.
          </p>

          <button 
            onClick={startVerification} 
            disabled={verifying}
            className="w-full py-4 rounded-xl text-white font-bold text-lg bg-[var(--color-primary)] hover:bg-[#153457] disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            {verifying ? 'Scanning Ledger...' : (completed ? 'Run Verification Again' : 'Start Audit Scan')}
          </button>

          {(verifying || completed) && (
            <div className="mt-8">
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span>Scan Progress</span>
                <span>{verifying ? 'In Progress' : 'Verified'}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  ref={progressBarRef}
                  className={`h-full rounded-full ${completed && !resultStrings[0]?.includes("ERROR") ? 'bg-green-500' : 'bg-blue-600'}`} 
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Output UI */}
        <div className="bg-[#0A2540] rounded-xl shadow-xl overflow-hidden flex flex-col relative min-h-[400px]">
          <div className="px-4 py-3 bg-[#11304F] border-b border-[#1A456B] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-[#8FB2D2] text-xs font-mono ml-4">auditor-verification-terminal // connection::secure</span>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto relative">
            <div ref={scanLineRef} className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_15px_3px_rgba(59,130,246,0.6)] z-10 opacity-0 pointer-events-none"></div>
            
            {!verifying && !completed && (
              <div className="text-slate-400 flex flex-col items-center justify-center h-full space-y-4">
                <ShieldAlert size={40} className="text-slate-500 opacity-50" />
                <span>Awaiting validation initiation command...</span>
              </div>
            )}

            {verifying && (
              <div className="text-green-400 opacity-80 space-y-1">
                <div className="animate-pulse">Fetching verification nodes... OK</div>
                <div className="animate-pulse" style={{ animationDelay: '0.2s'}}>Downloading latest blockchain state...</div>
              </div>
            )}

            {completed && (
              <div className="space-y-4">
                {resultStrings.map((resStr, idx) => {
                    const isBad = resStr.includes('ERROR') || resStr.includes('MODIFIED') || resStr.includes('BROKEN') || resStr.includes('DELETED');
                    return (
                      <div key={idx} className={resStr.includes('SUCCESS') || resStr.includes('intact') || resStr.includes('INTACT') ? 'text-green-400' : (isBad ? 'text-red-400 font-bold' : 'text-slate-300')}>
                          {resStr}
                      </div>
                    );
                })}
                
                {(() => {
                  const hasTampering = resultStrings.some(r => r.includes('ERROR') || r.includes('MODIFIED') || r.includes('BROKEN') || r.includes('DELETED'));
                  if (resultStrings.length > 0) {
                    if (!hasTampering) {
                      return (
                        <div className="mt-6 p-4 border border-green-500/30 bg-green-500/10 rounded flex items-center gap-4">
                          <CheckCircle className="text-green-400" size={32} />
                          <div>
                            <h4 className="text-green-400 font-bold text-lg">CHAIN VERIFIED</h4>
                            <p className="text-green-500/80 text-sm mt-1">All hashes match. No database tampering detected.</p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="mt-6 p-4 border border-red-500/30 bg-red-500/10 rounded flex items-center gap-4 animate-pulse">
                          <ShieldAlert className="text-red-400" size={32} />
                          <div>
                            <h4 className="text-red-400 font-bold text-lg">SYSTEM BREACH: TAMPERING DETECTED</h4>
                            <p className="text-red-500/80 text-sm mt-1">Cryptographic sequence broken. Immediate lockdown recommended.</p>
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AuditorVerify;
