import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (!agreed) {
      showToast('Please agree to the terms & privacy policy', 'warning');
      return;
    }

    register(name, email);
    showToast('Account created successfully! Welcome to NOVA MART.', 'success');
    navigate('/account');
  };

  // Password strength check
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 1;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md mb-3">
            N
          </div>
          <h1 className="text-2xl font-black text-slate-900">Create Account</h1>
          <p className="text-xs text-slate-500 mt-1">Join NOVA MART for exclusive deals and express checkout</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Connor"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

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
                placeholder="sarah@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Password strength meter */}
            {password && (
              <div className="mt-2 flex items-center gap-1">
                <div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 ${strength >= 1 ? 'bg-rose-500' : ''}`} />
                  <div className={`h-full flex-1 ${strength >= 2 ? 'bg-amber-500' : ''}`} />
                  <div className={`h-full flex-1 ${strength >= 3 ? 'bg-indigo-500' : ''}`} />
                  <div className={`h-full flex-1 ${strength >= 4 ? 'bg-emerald-500' : ''}`} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              I agree to NOVA MART's{' '}
              <Link to="/policy/terms" className="font-bold text-indigo-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/policy/privacy" className="font-bold text-indigo-600 hover:underline">
                Privacy Policy
              </Link>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md"
          >
            Create My Account
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
