import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const PolicyPages: React.FC = () => {
  const { type = 'privacy' } = useParams<{ type: string }>();

  const titleMap: Record<string, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    returns: 'Return & Exchange Policy',
    shipping: 'Shipping & Delivery Policy'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Navigation tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { key: 'privacy', label: 'Privacy Policy' },
          { key: 'terms', label: 'Terms of Service' },
          { key: 'returns', label: 'Return Policy' },
          { key: 'shipping', label: 'Shipping Policy' }
        ].map((t) => (
          <Link
            key={t.key}
            to={`/policy/${t.key}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              type === t.key
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-8 sm:p-12 space-y-6 text-sm text-slate-600 leading-relaxed">
        <h1 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
          {titleMap[type] || 'Store Policy'}
        </h1>
        <p className="text-xs text-slate-400 font-medium">Last updated: January 1, 2026</p>

        {type === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
            <p>
              At NOVA MART, we respect your privacy. We collect personal information you provide when creating an account, placing an order, or contacting customer support. This includes your name, email address, shipping address, and payment information.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. How We Use Your Data</h3>
            <p>
              Your data is strictly used to fulfill orders, process payments, provide tracking updates, and improve your shopping experience. We never sell your personal information to third-party advertisers.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Security & Encryption</h3>
            <p>
              All payment transactions are encrypted using industry-standard 256-bit SSL technology.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Terms of Use</h3>
            <p>
              By accessing NOVA MART, you agree to comply with our general conditions of sale. All content, trademarks, logos, and product designs featured on this website are the property of NOVA MART or its brand partners.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Product Pricing & Availability</h3>
            <p>
              Prices and availability are subject to change without prior notice. In the event of a pricing error, NOVA MART reserves the right to cancel affected orders with a full refund.
            </p>
          </div>
        )}

        {type === 'returns' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. 30-Day Money Back Guarantee</h3>
            <p>
              We want you to be completely satisfied with your purchase. You may return any unused item in its original packaging within 30 days of delivery for a full refund or exchange.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. How to Request a Return</h3>
            <p>
              To initiate a return, visit your Account Dashboard, select the order, and click "Request Return". A pre-paid shipping label will be generated instantly.
            </p>
          </div>
        )}

        {type === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Shipping Options & Delivery Times</h3>
            <p>
              We offer Express 2-Day Shipping on all orders over $50. Standard orders below $50 are delivered within 3-5 business days for a $5.99 flat rate.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Order Tracking</h3>
            <p>
              Every order includes a real-time tracking number sent via email immediately upon dispatch from our fulfillment centers.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
