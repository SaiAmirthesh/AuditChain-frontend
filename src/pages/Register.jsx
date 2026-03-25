import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthData } from '../utils/auth';
import { User, KeyRound, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username: name, password, role: 'user' });
      // Authenticate directly after registering
      const res = await api.post('/auth/login', { username: name, password });
      if (res.data.error) throw new Error(res.data.error);
      
      setAuthData(res.data.token, res.data.role || 'user', res.data.username);
      navigate(`/${res.data.role || 'user'}/dashboard`);
    } catch (err) {
      alert("Registration failed: " + (err.message || "Please try a different username."));
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
        <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Create your account</h3>
        <p className="text-sm text-slate-500 mt-1">Join AuditChain for secure banking</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
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
              className="pl-10 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center mt-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[#153457] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Register Account
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">Already have an account? </span>
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in instead
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;
