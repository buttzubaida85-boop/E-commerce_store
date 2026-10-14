import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  TrendingUp,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shop/ProductCard';

export const HomePage: React.FC = () => {
  const { products, categories, setFilters } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'deals' | 'featured'>('all');

  // Countdown timer for Deal of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by tab
  const tabProducts = products.filter((p) => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'deals') return (p.discount && p.discount > 0) || p.dealOfDay;
    if (activeTab === 'featured') return p.featured;
    return true;
  }).slice(0, 8);

  // Special deal of the day product
  const dealProduct = products.find((p) => p.dealOfDay) || products[0];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4 shadow-2xl">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Text */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 border border-white/10 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Premium Curated Collection 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Discover Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-amber-200 to-rose-300">
                You'll Love.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Shop premium electronics, apparel, home decor, and beauty essentials at unbeatable prices — delivered straight to your door with express 2-day delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-2 group"
              >
                Shop Catalog Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/shop?deals=true"
                onClick={() => setFilters((f) => ({ ...f, onSaleOnly: true }))}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all border border-white/15 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" /> Explore Flash Deals
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-white">20k+</p>
                <p className="text-xs text-slate-400">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">4.9 ★</p>
                <p className="text-xs text-slate-400">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="text-xs text-slate-400">VIP Support</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Card */}
          <div className="relative mx-auto lg:ml-auto max-w-md w-full">
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-2">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
                alt="Apex Pro Headphones"
                className="w-full h-80 object-cover rounded-2xl"
              />
              
              {/* Floating Product Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    Featured Item
                  </span>
                  <h3 className="text-sm font-bold text-white truncate">Apex Pro Headphones</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-black text-emerald-400">$249.99</span>
                    <span className="text-xs text-slate-400 line-through">$299.99</span>
                  </div>
                </div>
                <Link
                  to="/product/apex-pro-wireless-headphones"
                  className="bg-white text-slate-900 p-2.5 rounded-xl font-bold hover:bg-indigo-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Browse Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Explore All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              onClick={() => setFilters((f) => ({ ...f, category: cat.name }))}
              className="group relative bg-white rounded-2xl border border-slate-100 p-3 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{cat.productCount} Items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID WITH TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Handpicked Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Trending Products
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'new', 'deals', 'featured'] as const).map((tab) => {
              const labels = {
                all: 'All Products',
                new: 'New Arrivals',
                deals: 'Hot Deals',
                featured: 'Featured'
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === tab
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-8 py-3.5 rounded-2xl text-xs transition-colors"
          >
            View Full Store Catalog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. DEAL OF THE DAY BANNER WITH COUNTDOWN */}
      {dealProduct && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white">
                <Clock className="w-3.5 h-3.5" /> Deal of the Day
              </div>

              <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">
                {dealProduct.name}
              </h2>

              <p className="text-white/90 text-sm max-w-md line-clamp-2">
                {dealProduct.shortDescription || dealProduct.description}
              </p>

              {/* Countdown timer blocks */}
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center min-w-16 border border-white/20">
                  <span className="block text-2xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-white/80">Hours</span>
                </div>
                <span className="text-2xl font-black">:</span>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center min-w-16 border border-white/20">
                  <span className="block text-2xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-white/80">Mins</span>
                </div>
                <span className="text-2xl font-black">:</span>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center min-w-16 border border-white/20">
                  <span className="block text-2xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-white/80">Secs</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={`/product/${dealProduct.slug}`}
                  className="bg-white text-slate-900 font-bold px-8 py-3.5 rounded-2xl text-sm hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2"
                >
                  Claim Deal - Save {dealProduct.discount}% <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto">
              <img
                src={dealProduct.images[0]}
                alt={dealProduct.name}
                className="w-full max-w-md h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>

          </div>
        </section>
      )}

      {/* 5. BRAND SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-slate-100">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Official Partners & Trusted Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-lg font-black tracking-widest text-slate-700">NOVASOUND</span>
          <span className="text-lg font-black tracking-widest text-slate-700">CHRONOS</span>
          <span className="text-lg font-black tracking-widest text-slate-700">VANGUARD</span>
          <span className="text-lg font-black tracking-widest text-slate-700">LUMINA</span>
          <span className="text-lg font-black tracking-widest text-slate-700">AEROMOTION</span>
          <span className="text-lg font-black tracking-widest text-slate-700">VERDANT</span>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Verified Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Loved by Thousands of Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'NOVA MART delivers insanely fast! Ordered my headphones on Tuesday and they arrived at my desk Thursday morning in pristine condition.',
              author: 'Marcus Vance',
              title: 'Verified Buyer',
              rating: 5,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
            },
            {
              quote: 'The customer service team is top tier. They answered my sizing questions within 5 minutes and the leather backpack quality is unbelievable.',
              author: 'Elena Rostova',
              title: 'Verified Buyer',
              rating: 5,
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
            },
            {
              quote: 'Best online shopping experience I have had this year. Easy order tracking, genuine product discounts, and effortless checkout.',
              author: 'David Miller',
              title: 'Verified Buyer',
              rating: 5,
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
            }
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.author}</p>
                  <p className="text-xs text-indigo-600 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
