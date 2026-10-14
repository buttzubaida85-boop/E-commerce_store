import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    showToast('Signed in successfully! Welcome back.', 'success');
    navigate('/account');
  };

  const handleDemoCustomer = () => {
    login('alex.rivers@example.com', 'user');
    showToast('Logged in as Demo Customer!', 'success');
    navigate('/account');
  };

  const handleDemoAdmin = () => {
    login('admin@novamart.com', 'admin');
    showToast('Logged in as Demo Administrator!', 'success');
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md mb-3">
            N
          </div>
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in to your NOVA MART account</p>
        </div>

        {/* Demo Quick Logins */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Demo Logins</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoCustomer}
              className="py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold border border-slate-200 shadow-2xs transition-colors"
            >
              Demo Customer
            </button>
            <button
              onClick={handleDemoAdmin}
              className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:underline">
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
