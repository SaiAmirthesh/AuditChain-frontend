import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Send, Building, CheckCircle, RefreshCcw, HandCoins, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const UserTransfer = () => {
  const [step, setStep] = useState(1); // 1: form, 2: processing, 3: success, 4: error
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const balanceRef = useRef(null);
  const moneyIconRef = useRef(null);
  const spinnerRef = useRef(null);
  const checkmarkRef = useRef(null);

  useEffect(() => {
    const fetchAcc = async () => {
      try {
        const res = await api.get('/user/dashboard');
        setAccount(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAcc();
  }, []);

  const formatMoney = (val) => val ? val.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : '₹0.00';

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > account?.balance) return;

    setStep(2);
    
    setTimeout(() => {
      if (spinnerRef.current) {
        gsap.to(spinnerRef.current, { rotation: 360, duration: 1, repeat: -1, ease: "linear" });
      }
      if (moneyIconRef.current) {
        gsap.fromTo(moneyIconRef.current, 
          { x: -50, opacity: 0 }, 
          { x: 50, opacity: 0, duration: 1.5, ease: "power1.inOut", repeat: -1 }
        );
      }
    }, 100);

    try {
      await api.post('/user/transfer', {
        fromAccount: account.accountNumber,
        toAccount: recipient,
        amount: parseFloat(amount)
      });
      completeTransfer();
    } catch (err) {
      gsap.killTweensOf(spinnerRef.current);
      gsap.killTweensOf(moneyIconRef.current);
      setStep(4);
      setErrorMsg(err.response?.data || err.message || 'Transfer failed');
    }
  };

  const completeTransfer = () => {
    gsap.killTweensOf(spinnerRef.current);
    gsap.killTweensOf(moneyIconRef.current);
    setStep(3);

    const newBalance = account.balance - parseFloat(amount);
    const obj = { val: account.balance };
    
    setTimeout(() => {
      if (checkmarkRef.current) {
        gsap.fromTo(checkmarkRef.current, 
          { scale: 0, rotation: -90, opacity: 0 }, 
          { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }
      gsap.to(obj, {
        val: newBalance,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          if (balanceRef.current) {
            balanceRef.current.innerText = obj.val.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
          }
        },
        onComplete: () => setAccount({ ...account, balance: newBalance })
      });
    }, 100);
  };

  const resetForm = () => {
    setRecipient('');
    setAmount('');
    setStep(1);
  };

  if (!account) return <div className="p-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Transfer Funds</h1>
        <p className="text-xs text-slate-500 mt-0.5">Send money securely across AuditChain</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="bg-blue-50/30 p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Balance</h2>
            <div className="text-2xl font-bold text-blue-900 mt-1 tracking-tight" ref={balanceRef}>
              {formatMoney(account.balance)}
            </div>
          </div>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 border border-slate-100">
            <Building size={20} />
          </div>
        </div>

        <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form key="form" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} onSubmit={handleTransfer} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient Account</label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. jsmith22"
                    className="block w-full border border-slate-200 rounded-lg shadow-sm py-2.5 px-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount to Send</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-base font-bold">₹</span>
                    </div>
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      max={account.balance}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="block w-full border border-slate-200 rounded-lg shadow-sm py-2.5 pl-8 pr-4 text-lg font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > account.balance} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg text-white bg-[var(--color-primary)] hover:bg-[#153457] disabled:opacity-50 transition-all text-sm font-bold shadow-md hover:-translate-y-0.5">
                    <Send size={18} /> Initiate Transfer
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="relative w-24 h-24">
                  <div ref={spinnerRef} className="absolute inset-0 border-4 border-slate-100 border-t-blue-600 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <HandCoins ref={moneyIconRef} className="text-slate-400" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Processing Transaction</h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">Writing to AuditChain ledger and verifying...</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div ref={checkmarkRef} className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Transaction Successful</h3>
                  <p className="text-slate-500 mt-2">{formatMoney(parseFloat(amount))} sent to <span className="font-medium text-slate-800">{recipient}</span></p>
                </div>
                <button onClick={resetForm} className="w-full mt-4 flex justify-center items-center gap-2 py-3 px-4 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all">
                  <RefreshCcw size={18} /> Make Another Transfer
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-inner">
                  <AlertCircle size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-800">Transaction Failed</h3>
                  <p className="text-slate-500 mt-2">{errorMsg}</p>
                </div>
                <button onClick={resetForm} className="w-full mt-4 flex justify-center items-center gap-2 py-3 px-4 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all">
                  <RefreshCcw size={18} /> Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default UserTransfer;
