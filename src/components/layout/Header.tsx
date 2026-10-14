import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  Package,
  LogOut,
  ChevronRight,
  Sparkles,
  Tag,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { cartItemCount, wishlist, products, categories, setFilters } = useShop();
  const { user, isAuthenticated, isAdmin, logout, toggleAdminMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search suggestions filtering
  const matchingProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters((prev) => ({ ...prev, search: searchQuery.trim() }));
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const activeLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1'
      : 'text-slate-700 hover:text-indigo-600 font-medium pb-1 transition-colors';
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-md py-3' : 'shadow-xs py-4'
      } border-b border-slate-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                NOVA<span className="text-indigo-600">MART</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                Everything You Love
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={activeLinkClass('/')}>
              Home
            </Link>
            <Link to="/shop" className={activeLinkClass('/shop')}>
              Shop
            </Link>
            <Link to="/categories" className={activeLinkClass('/categories')}>
              Categories
            </Link>
            <Link
              to="/shop?deals=true"
              onClick={() => setFilters((f) => ({ ...f, onSaleOnly: true }))}
              className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Deals
            </Link>
            <Link to="/about" className={activeLinkClass('/about')}>
              About
            </Link>
            <Link to="/contact" className={activeLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          {/* Search Bar with Instant Autocomplete */}
          <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search products, brands, categories..."
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 text-sm pl-10 pr-10 py-2.5 rounded-full border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Suggestions Dropdown */}
            {searchFocused && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                {matchingProducts.length > 0 ? (
                  <div className="p-2 divide-y divide-slate-100">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Product Matches
                    </div>
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={() => setSearchFocused(false)}
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                            {p.name}
                          </p>
                          <span className="text-xs text-slate-500">{p.category}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900 shrink-0">
                          ${p.price.toFixed(2)}
                        </span>
                      </Link>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-2.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-scale-up">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Account / User Menu Dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors border border-transparent focus:border-slate-200"
                title="Account"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-slide-up">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        <span className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {isAdmin ? 'ADMINISTRATOR' : 'CUSTOMER'}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/account"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <UserIcon className="w-4 h-4" /> My Dashboard
                        </Link>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <Package className="w-4 h-4" /> My Orders
                        </Link>
                        <Link
                          to="/order-tracking"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <Clock className="w-4 h-4" /> Track Order
                        </Link>

                        {/* Admin Toggle Switch */}
                        <div className="px-4 py-2 border-t border-b border-slate-100 my-1 bg-slate-50/50">
                          <button
                            onClick={toggleAdminMode}
                            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-indigo-600 py-1"
                          >
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-indigo-600" />
                              {isAdmin ? 'Switch to Storefront' : 'Switch to Admin Portal'}
                            </span>
                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                              Toggle
                            </span>
                          </button>
                        </div>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={logout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-slate-500 mb-3">Welcome to NOVA MART</p>
                      <Link
                        to="/login"
                        className="block w-full py-2 bg-slate-900 text-white rounded-xl font-semibold text-xs hover:bg-slate-800 transition-colors mb-2"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full py-2 bg-slate-100 text-slate-900 rounded-xl font-semibold text-xs hover:bg-slate-200 transition-colors"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100%] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl p-6 transition-all duration-300 max-h-[85vh] overflow-y-auto animate-slide-down z-50">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-100 text-slate-900 text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Links */}
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              Home <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/shop"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              Shop <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/categories"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              Categories <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/shop?deals=true"
              onClick={() => setFilters((f) => ({ ...f, onSaleOnly: true }))}
              className="flex items-center justify-between text-amber-600 font-semibold py-2 border-b border-slate-100"
            >
              Deals & Offers <Sparkles className="w-4 h-4 text-amber-500" />
            </Link>
            <Link
              to="/order-tracking"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              Order Tracking <Clock className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              About Us <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-between text-slate-900 font-semibold py-2 border-b border-slate-100"
            >
              Contact <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>

          {/* Mobile Admin & Account Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    to="/account"
                    className="text-center py-2 bg-slate-100 text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-200"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-center py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
                    >
                      Admin Portal
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="text-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-center py-2.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl text-xs font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
