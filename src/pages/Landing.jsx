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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${scrolled ? 'w-[95%] lg:w-[90%]' : 'w-full'}`}>
          <div className={`flex items-center justify-between px-5 h-14 rounded-xl border transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-lg' : 'bg-transparent border-transparent'}`}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="w-7 h-7 rounded-md shadow-sm" alt="AuditChain Logo" />
              <span className="text-lg font-bold tracking-tight text-slate-900">AuditChain</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 mx-2 transition-colors">Sign In</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md hover:-translate-y-0.5">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION - NEW CENTERED IMMERSIVE DESIGN */}
        <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-8">
                <ShieldCheck size={12} /> Next-Gen Banking Infrastructure
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-6xl font-extrabold leading-[1.05] mb-8 tracking-tight text-slate-900 max-w-4xl mx-auto">
                The future of trust is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                  redefined by code.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
                AuditChain is the world's first banking system where every transaction is a cryptographically signed block in an immutable ledger. <br />Zero drift. Zero doubt.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-20">
                <Link to="/register" className="group inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1">
                  Open Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-slate-50">
                  Explore the Ledger
                </Link>
              </div>
            </motion.div>

            {/* ARTISTIC VISUALIZATION: THE AUDIT CHAIN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-5xl relative"
            >
              <div className="relative p-1 rounded-[2rem] bg-gradient-to-b from-slate-200/50 to-transparent shadow-2xl">
                <div className="bg-white rounded-[1.8rem] overflow-hidden border border-white/50 backdrop-blur-sm">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Activity size={12} className="text-blue-500 animate-pulse" /> Live Integrity Sweep: 100% Secure
                    </div>
                    <div className="w-12"></div>
                  </div>
                  
                  <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6 relative">
                    {/* Visual decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20"></div>
                    
                    {[
                      { height: "40,291", hash: "00a3...f82b", status: "VERIFIED" },
                      { height: "40,290", hash: "9c1a...d4e5", status: "VERIFIED" },
                      { height: "40,289", hash: "b2c3...a8f9", status: "VERIFIED" }
                    ].map((block, i) => (
                      <div key={i} className={`p-6 rounded-2xl border transition-all duration-500 hover:shadow-lg ${i === 0 ? 'bg-blue-50/50 border-blue-100 scale-105 shadow-xl relative z-10' : 'bg-slate-50/30 border-slate-100 opacity-60'}`}>
                         <div className="flex justify-between items-start mb-6">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                               <Cpu size={20} className={i === 0 ? 'text-blue-600' : 'text-slate-400'} />
                            </div>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${i === 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                               {block.status}
                            </span>
                         </div>
                         <div className="space-y-1 mb-4">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Block Height</div>
                            <div className={`text-xl font-bold ${i === 0 ? 'text-slate-900' : 'text-slate-500'}`}>#{block.height}</div>
                         </div>
                         <div className="font-mono text-[10px] text-slate-400 truncate py-2 px-3 bg-white/50 rounded-lg border border-slate-100">
                            {block.hash}
                         </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 text-white font-mono text-[10px] flex justify-center gap-8 items-center overflow-hidden">
                     <span className="flex items-center gap-2 opacity-60"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> SYSTEM: ONLINE</span>
                     <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> LATENCY: 2ms</span>
                     <span className="hidden md:flex items-center gap-2 opacity-60"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> CONSENSUS: ACTIVE</span>
                     <marquee className="flex-1 opacity-40">sha256:00a3b8d1b6b0b3b4b1a9c1a1a2b3c4d5e6f... sha256:f82b082d72a2b28100818b9cad0e1f20... sha256:a3b8d1b60b3b4b1a9c1a1a2b3c4d5e6f...</marquee>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </motion.div>

          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-20 bg-slate-50 relative border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
                 Architected for <br />
                 <span className="text-blue-600">Zero Trust.</span>
              </h2>
              <p className="text-slate-600 font-medium text-base leading-relaxed">
                 Standard banks rely on promises. We rely on cryptographic certainty. Every byte is signed, sealed, and delivered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  transition={{ delay: i * 0.05 }}
                  className="group relative p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <f.icon size={24} className={`mb-5 ${f.glow} transition-colors`} />
                  <h3 className="text-lg font-bold mb-3 tracking-tight text-slate-900">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY SPOTLIGHT */}
        <section id="security" className="py-24 relative bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="bg-blue-50/50 rounded-3xl p-10 lg:p-16 border border-blue-100 overflow-hidden relative">
                 <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10 text-left">
                    <div className="lg:w-1/2">
                       <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900">
                          The math of <br />
                          <span className="text-blue-600">immutability.</span>
                       </h2>
                       <div className="space-y-6">
                          {[
                            { title: "Continuous Integrity", desc: "System performs a full chain sweep every 500ms.", icon: Activity },
                            { title: "Zero Latency Response", desc: "Detected breaches trigger automatic system lockdown.", icon: Lock }
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-5">
                               <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                                  <item.icon className="text-blue-600" size={20} />
                               </div>
                               <div>
                                  <h4 className="text-base font-bold mb-1 tracking-tight text-slate-900">{item.title}</h4>
                                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                    <div className="lg:w-1/2 w-full">
                       <div className="aspect-square rounded-2xl bg-white border border-slate-200 p-8 flex flex-col justify-center gap-6 shadow-xl relative group overflow-hidden max-w-sm mx-auto">
                          <div className="flex justify-center mb-6">
                             <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-100 relative shadow-inner">
                                <BrainCircuit size={48} className="text-blue-600" />
                             </div>
                          </div>
                          <div className="text-center">
                             <div className="text-lg font-bold text-slate-900 mb-2">Gemini AI Engine</div>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                                Forensic Analysis Layer: <span className="text-blue-600 font-black">Active</span>
                             </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[9px] text-slate-600">
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
        <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900">The Trust Workflow</h2>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">How we secure your capital</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 text-center relative">
               <div className="hidden md:block absolute top-[25%] left-0 w-full h-px bg-slate-200 -z-10"></div>
               
               {[
                 { title: "One-Way Hashing", desc: "Every transaction produces a cryptographically unique fingerprint.", icon: Database },
                 { title: "Temporal Chaining", desc: "New blocks are fused to the previous block's SHA-256 result.", icon: Shield },
                 { title: "Public Audit", desc: "Auditors verify integrity without accessing private data.", icon: Search }
               ].map((s, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-6 shadow-lg hover:border-blue-400 transition-colors">
                       <s.icon size={28} />
                    </div>
                    <div className="text-blue-600 font-bold mb-3 uppercase text-[10px] tracking-widest">Step 0{i+1}</div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">{s.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 lg:p-20 text-center text-white relative shadow-xl shadow-blue-500/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight relative">Future of Banking <br /> rests on code.</h2>
              <p className="text-blue-50 text-base md:text-lg font-medium mb-10 max-w-md mx-auto opacity-90 relative">
                 Secure your wealth with mathematical certainty. No fine print. Only code.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-102 hover:shadow-lg relative">
                OPEN ACCOUNT <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
             <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/logo.png" className="w-7 h-7 rounded-md" alt="Logo" />
                  <span className="text-xl font-bold text-slate-900">AuditChain</span>
                </div>
                <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed mb-6">
                   Infrastructure for immutable digital assets and tamper-proof ledgers. Built on code. Trusted by consensus.
                </p>
             </div>
             
             <div>
                <h4 className="font-bold text-slate-900 mb-6 text-[10px] uppercase tracking-[0.2em]">Ecosystem</h4>
                <ul className="space-y-3 text-slate-500 font-bold text-xs">
                   <li><Link to="/register" className="hover:text-blue-600 transition-colors">Individual Portal</Link></li>
                   <li><Link to="/login" className="hover:text-blue-600 transition-colors">Admin Console</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 mb-6 text-[10px] uppercase tracking-[0.2em]">Company</h4>
                <ul className="space-y-3 text-slate-500 font-bold text-xs">
                   <li className="hover:text-blue-600 transition-colors cursor-pointer text-blue-400">Security Specs</li>
                   <li className="hover:text-blue-600 transition-colors cursor-pointer">Careers</li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 mb-6 text-[10px] uppercase tracking-[0.2em]">Contact</h4>
                <div className="text-slate-500 font-bold text-xs">
                   support@auditchain.sys
                </div>
             </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex justify-between items-center">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">© 2026 AuditChain Labs</span>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.3em]">Systems Online</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
