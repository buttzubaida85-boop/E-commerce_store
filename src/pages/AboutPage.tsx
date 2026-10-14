import React from 'react';
import { Award, ShieldCheck, Heart, Users, Sparkles, Truck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
          Our Brand Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Everything You Love. <br />
          <span className="text-indigo-600">One Place.</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded in 2026, NOVA MART was born from a simple mission: curate the highest quality electronics, apparel, lifestyle goods, and home accents under one seamless shopping experience.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Premium Quality Standards</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every single product in our catalog undergoes strict durability, authenticity, and aesthetic inspections before reaching our fulfillment centers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">2-Day Climate Express</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We partner with carbon-neutral logistics providers to ensure your package arrives in 2 business days in 100% recyclable packaging.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Customer Obsession</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our support concierges are available 24/7 to answer questions, handle instant exchanges, or suggest tailored product recommendations.
          </p>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="bg-slate-900 text-white rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xl">
        <div>
          <p className="text-4xl font-black text-amber-400">100k+</p>
          <p className="text-xs text-slate-400 mt-1">Orders Shipped</p>
        </div>
        <div>
          <p className="text-4xl font-black text-indigo-400">99.8%</p>
          <p className="text-xs text-slate-400 mt-1">On-Time Delivery</p>
        </div>
        <div>
          <p className="text-4xl font-black text-emerald-400">4.9/5</p>
          <p className="text-xs text-slate-400 mt-1">Customer Rating</p>
        </div>
        <div>
          <p className="text-4xl font-black text-rose-400">24/7</p>
          <p className="text-xs text-slate-400 mt-1">Dedicated Support</p>
        </div>
      </div>

    </div>
  );
};
