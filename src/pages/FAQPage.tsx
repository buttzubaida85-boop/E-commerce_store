import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Shipping & Delivery',
      q: 'How long does shipping take and what does it cost?',
      a: 'We offer free 2-day express courier shipping on all orders over $50. Standard orders below $50 incur a flat $5.99 shipping fee. Orders are dispatched within 24 hours of placement.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'Do you ship internationally?',
      a: 'Yes! NOVA MART ships to over 45 countries worldwide via DHL Express. International shipping duties and taxes are calculated transparently at checkout.'
    },
    {
      category: 'Returns & Refunds',
      q: 'What is your return policy?',
      a: 'We offer a 30-day risk-free return policy on all unworn, unused items in original packaging. Returns are 100% free with pre-paid shipping labels provided in your customer account.'
    },
    {
      category: 'Returns & Refunds',
      q: 'How long does a refund take to process?',
      a: 'Once your return is received and inspected at our fulfillment center, your refund will be processed back to your original payment method within 3 to 5 business days.'
    },
    {
      category: 'Orders & Payments',
      q: 'What payment methods do you accept?',
      a: 'We accept Visa, MasterCard, American Express, Apple Pay, Google Pay, PayPal Express, and Cash on Delivery (select countries).'
    },
    {
      category: 'Orders & Payments',
      q: 'Can I change or cancel my order after placing it?',
      a: 'If you need to make changes or cancel an order, please contact our 24/7 concierge within 1 hour of placing the order before dispatch.'
    },
    {
      category: 'Products & Warranty',
      q: 'Are all products authentic and backed by warranty?',
      a: '100% Yes. NOVA MART is an authorized distributor for all brands in our store. Every product comes with full manufacturer warranty and our genuine quality guarantee.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
          Knowledge Base
        </span>
        <h1 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-500">Find quick answers to common questions about shipping, returns, and orders.</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions or keywords..."
          className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 shadow-xs focus:border-indigo-500 outline-none"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
