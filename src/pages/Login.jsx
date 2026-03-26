import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthData } from '../utils/auth';
import { Shield, User, KeyRound, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      setAuthData(res.data.token, res.data.role, res.data.username);
      navigate(`/${res.data.role}/dashboard`);
    } catch (err) {
      alert("Login failed: " + (err.message || "Check your credentials."));
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Sign in to your account</h3>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select your role to access the correct portal</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Select Role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'user', label: 'User', icon: User },
              { id: 'admin', label: 'Admin', icon: Building },
              { id: 'auditor', label: 'Auditor', icon: Shield },
            ].map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg border text-sm transition-all ${
                  role === r.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <r.icon size={20} className="mb-1" />
                {r.label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[#153457] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Sign in securely
        </button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">New to AuditChain?</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Create an account
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
