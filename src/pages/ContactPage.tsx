import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our concierge team!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Customer Service
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">Get in Touch with Concierge</h1>
        <p className="text-sm text-slate-500 mt-2">
          Have questions about an order, custom sizing, or product specifications? We're here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Email Support</p>
              <p className="text-sm font-bold text-slate-900">support@novamart.com</p>
              <p className="text-[10px] text-slate-500">Responds within 2 hours</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Customer Hotline</p>
              <p className="text-sm font-bold text-slate-900">+1 (800) 555-NOVA</p>
              <p className="text-[10px] text-slate-500">Toll-free 24/7</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Headquarters</p>
              <p className="text-sm font-bold text-slate-900">100 Nova Tower, San Francisco</p>
              <p className="text-[10px] text-slate-500">CA 94105, United States</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you for reaching out to NOVA MART. One of our support concierges will review your inquiry and get back to you at <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivers"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Order Inquiry, Sizing, Return, etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe how we can help you..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Inquiry to Concierge
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
