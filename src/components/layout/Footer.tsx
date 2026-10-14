import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Instagram,
  Facebook,
  Youtube,
  Twitter
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing! Check your email for a 15% discount code.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      
      {/* Value Proposition Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">30-Day Money Back</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free easy returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-0.5">Protected by 256-bit SSL</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 VIP Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated customer care</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                N
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                NOVA<span className="text-indigo-400">MART</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Everything You Love. One Place. Discover curated electronics, fashion, beauty, home decor, and outdoor essentials at unbeatable prices.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h5 className="text-white text-sm font-bold mb-2">Subscribe for exclusive offers</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 flex-1 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h5 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Shop</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/shop?sort=rating" className="hover:text-white transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link to="/shop?deals=true" className="hover:text-amber-400 transition-colors font-medium">Flash Deals</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">Browse Categories</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h5 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Customer Service</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-white transition-colors">Order Tracking</Link>
              </li>
              <li>
                <Link to="/policy/privacy" className="hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h5 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Company</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About NOVA MART</Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">Careers <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded ml-1">Hiring</span></a>
              </li>
              <li>
                <Link to="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policy/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NOVA MART Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
