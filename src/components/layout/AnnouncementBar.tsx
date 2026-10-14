import React, { useState } from 'react';
import { X, Sparkles, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 relative z-40 transition-all duration-300 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-center gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium text-[11px] border border-indigo-500/30">
            <Sparkles className="w-3 h-3 text-amber-400" /> NEW PROMO
          </span>
          <span className="font-medium tracking-wide">
            FREE EXPRESS SHIPPING ON ORDERS OVER $50
          </span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-300">
            Use code <strong className="text-amber-300 font-bold tracking-wider">WELCOME20</strong> for 20% OFF
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
