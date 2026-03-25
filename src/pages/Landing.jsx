import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Wallet, 
  Activity, 
  Globe, 
  Lock, 
  Zap, 
  Search, 
  Database,
  Shield,
  CheckCircle2,
  BrainCircuit,
  Cpu,
  BarChart3
} from 'lucide-react';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* Animated Background Blobs (Softer and Pastel) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-indigo-50/40 rounded-full blur-[150px]" 
        />
      </div>

      {/* Floating Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${scrolled ? 'w-[95%] lg:w-[90%]' : 'w-full'}`}>
          <div className={`flex items-center justify-between px-6 h-16 rounded-2xl border transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl' : 'bg-transparent border-transparent'}`}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="w-8 h-8 rounded-lg shadow-sm" alt="AuditChain Logo" />
              <span className="text-xl font-bold tracking-tight text-slate-900">AuditChain</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 mx-2 transition-colors">Sign In</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-44 lg:pt-60 pb-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center text-left">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8">
                <ShieldCheck size={14} /> Cryptographic Proof of Reserves
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">
                Banking, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 animate-gradient">
                  redefined by code.
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                The first banking infrastructure built entirely on a tamper-evident audit chain. Transparent. Immutable. Secure by design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="group inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1">
                  Start Your Chain <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:bg-slate-50">
                  Institutional Login
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tight text-slate-900">$4.2B+</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Audit Volume</span>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tight text-slate-900">0%</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Chain Drift</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 p-8 rounded-[3rem] bg-white border border-slate-100 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20"></div>
                
                <div className="flex justify-between items-center mb-8 relative">
                   <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Health</div>
                      <div className="text-xl font-black text-slate-900">Live Audit Ledger</div>
                   </div>
                   <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <Cpu size={24} className="text-blue-600" />
                   </div>
                </div>

                <div className="space-y-4 font-mono text-xs relative">
                   <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-700 flex justify-between items-center group hover:bg-blue-100 transition-colors">
                      <span className="flex items-center gap-3 font-bold">
                         <CheckCircle2 size={14} className="text-blue-600" />
                         BLOCK #40,291 VERIFIED
                      </span>
                      <span className="text-[10px] text-slate-400 italic">2ms ago</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600">
                      {`{`} data: "f82b...a9c1", hash: "sha256:00a3..." {`}`}
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                         <BarChart3 size={18} className="text-blue-600 mb-2" />
                         <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Integrity</div>
                         <div className="text-lg font-black text-blue-700">100.00%</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                         <ShieldCheck size={18} className="text-indigo-600 mb-2" />
                         <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Defense</div>
                         <div className="text-lg font-black text-indigo-700">ACTIVE</div>
                      </div>
                   </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-blue-100 rounded-2xl blur-2xl -z-10" 
              />
            </motion.div>

          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 bg-slate-50 relative border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
                 Architected for <br />
                 <span className="text-blue-600">Zero Trust.</span>
              </h2>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                 Standard banks rely on promises. We rely on cryptographic certainty. Every byte is signed, sealed, and delivered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "SHA-256 Chaining", desc: "Our audit log uses a hash chain. Modifying a record breaks the sequence instantly.", icon: Lock, glow: "text-blue-600" },
                { title: "Real-time Tamper Alerts", desc: "Bots scan your account thousands of times per second. Instant detection.", icon: Activity, glow: "text-indigo-600" },
                { title: "Gemini AI Forensics", desc: "Advanced AI analyzes failed verification cycles to explain exactly what happened.", icon: Zap, glow: "text-amber-600" },
                { title: "Immutable History", desc: "Written transactions are mathematically permanent. No erasing the audit trail.", icon: Database, glow: "text-emerald-600" },
                { title: "Instant Verification", desc: "Verify your own account integrity at any time through our Auditor portal.", icon: ShieldCheck, glow: "text-cyan-600" },
                { title: "Universal Ledger", desc: "A single source of truth for all users. Consensus driven by code.", icon: Globe, glow: "text-violet-600" }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <f.icon size={32} className={`mb-6 ${f.glow} transition-colors`} />
                  <h3 className="text-xl font-extrabold mb-4 tracking-tight text-slate-900">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY SPOTLIGHT */}
        <section id="security" className="py-32 relative bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="bg-blue-50/50 rounded-[4rem] p-12 lg:p-24 border border-blue-100 overflow-hidden relative">
                 <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10 text-left">
                    <div className="lg:w-1/2">
                       <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-slate-900">
                          The math of <br />
                          <span className="text-blue-600">immutability.</span>
                       </h2>
                       <div className="space-y-8">
                          {[
                            { title: "Continuous Integrity", desc: "System performs a full chain sweep every 500ms.", icon: Activity },
                            { title: "Zero Latency Response", desc: "Detected breaches trigger automatic system lockdown.", icon: Lock }
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                               <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                                  <item.icon className="text-blue-600" size={24} />
                               </div>
                               <div>
                                  <h4 className="text-lg font-bold mb-1 tracking-tight text-slate-900">{item.title}</h4>
                                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                    <div className="lg:w-1/2 w-full">
                       <div className="aspect-square rounded-[3rem] bg-white border border-slate-200 p-8 flex flex-col justify-center gap-6 shadow-2xl relative group overflow-hidden">
                          <div className="flex justify-center mb-8">
                             <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center border-4 border-blue-100 relative shadow-inner">
                                <BrainCircuit size={64} className="text-blue-600" />
                             </div>
                          </div>
                          <div className="text-center">
                             <div className="text-xl font-black text-slate-900 mb-2">Gemini AI Engine</div>
                             <p className="text-sm text-slate-500 font-bold uppercase tracking-widest leading-none">
                                Forensic Analysis Layer: <span className="text-blue-600 font-black">Active</span>
                             </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-slate-600">
                             {`>>>`} PREDICTIVE MODEL LOADED <br />
                             {`>>>`} PATTERN RECOGNITION ACTIVE <br />
                             {`>>>`} ANOMALY DETECTION: 0 DEFECTS
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-32 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">The Trust Workflow</h2>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">How we secure your capital</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center relative">
               <div className="hidden md:block absolute top-[25%] left-0 w-full h-px bg-slate-200 -z-10"></div>
               
               {[
                 { title: "One-Way Hashing", desc: "Every transaction produces a cryptographically unique fingerprint.", icon: Database },
                 { title: "Temporal Chaining", desc: "New blocks are fused to the previous block's SHA-256 result.", icon: Shield },
                 { title: "Public Audit", desc: "Auditors verify integrity without accessing private data.", icon: Search }
               ].map((s, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-8 shadow-xl group hover:border-blue-400 transition-colors">
                       <s.icon size={32} />
                    </div>
                    <div className="text-blue-600 font-black mb-4 uppercase text-xs tracking-widest">Step 0{i+1}</div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">{s.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xs">{s.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-16 lg:p-24 text-center text-white relative shadow-2xl shadow-blue-500/20">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter relative">Future of Banking <br /> rests on code.</h2>
              <p className="text-blue-50 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto opacity-90 relative">
                 Secure your wealth with mathematical certainty. No fine print. Only code.
              </p>
              <Link to="/register" className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-[2rem] text-xl font-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/50 relative">
                OPEN ACCOUNT <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
             <div className="col-span-2">
                <div className="flex items-center gap-2 mb-8">
                  <img src="/logo.png" className="w-8 h-8 rounded-lg" alt="Logo" />
                  <span className="text-2xl font-black text-slate-900">AuditChain</span>
                </div>
                <p className="text-slate-500 font-medium max-w-xs leading-relaxed mb-8">
                   Infrastructure for immutable digital assets and tamper-proof ledgers. Built on code. Trusted by consensus.
                </p>
             </div>
             
             <div>
                <h4 className="font-bold text-slate-900 mb-8 text-xs uppercase tracking-[0.2em]">Ecosystem</h4>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                   <li><Link to="/register" className="hover:text-blue-600 transition-colors">Individual Portal</Link></li>
                   <li><Link to="/login" className="hover:text-blue-600 transition-colors">Admin Console</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 mb-8 text-xs uppercase tracking-[0.2em]">Company</h4>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                   <li className="hover:text-blue-600 transition-colors cursor-pointer text-blue-400">Security Specs</li>
                   <li className="hover:text-blue-600 transition-colors cursor-pointer">Careers</li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 mb-8 text-xs uppercase tracking-[0.2em]">Contact</h4>
                <div className="text-slate-500 font-bold text-sm">
                   support@auditchain.sys
                </div>
             </div>
          </div>
          
          <div className="pt-12 border-t border-slate-200 flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">© 2026 AuditChain Labs</span>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Systems Online</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
