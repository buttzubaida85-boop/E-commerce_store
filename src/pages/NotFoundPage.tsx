import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-4">
        <span className="text-5xl font-black text-indigo-600 block">404</span>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-500">
          The page or product link you are looking for might have been moved, deleted, or never existed.
        </p>

        <div className="pt-4 flex flex-col gap-2">
          <Link
            to="/"
            className="bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/shop"
            className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Store Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
