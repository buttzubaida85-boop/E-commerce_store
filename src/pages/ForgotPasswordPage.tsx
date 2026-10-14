import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      showToast('Password reset link sent to your email!', 'success');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">Reset Your Password</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your email address and we'll send you a password reset link
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Check Your Inbox</h3>
            <p className="text-xs text-emerald-700">
              We sent a password reset link to <strong>{email}</strong>. Please check your email inbox and spam folder.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-indigo-600 hover:underline pt-2 block mx-auto"
            >
              Try another email address
            </button>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
