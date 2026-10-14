import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Clock,
  ChevronRight,
  ShieldCheck,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

export const UserAccountPage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { userOrders, products, wishlist } = useShop();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'saved'>('orders');

  // Edit profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Account Login Required</h2>
        <p className="text-xs text-slate-500 mb-6">Please sign in to view your orders and profile settings.</p>
        <Link to="/login" className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    showToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Signed out of account', 'info');
    navigate('/');
  };

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Account Hero Header */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg border-2 border-indigo-400">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase">
                {user.role === 'admin' ? 'Administrator' : 'VIP Member'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{user.email} • Member since 2026</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors border border-white/15 flex items-center gap-2 self-start sm:self-auto relative z-10"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'orders', label: `Order History (${userOrders.length})`, icon: Package },
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'saved', label: `Saved Wishlist (${savedProducts.length})`, icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full p-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          
          {/* 1. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Your Recent Orders
              </h2>

              {userOrders.length > 0 ? (
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-2xl p-6 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-xs text-slate-400">Order ID</span>
                          <h3 className="text-base font-black text-slate-900">{order.orderNumber}</h3>
                          <span className="text-[11px] text-slate-500">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Shipped'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.status}
                          </span>
                          <Link
                            to={`/order-tracking?q=${order.orderNumber}`}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-3.5 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1"
                          >
                            <Clock className="w-3.5 h-3.5" /> Track Package
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded-xl bg-slate-50 border border-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{item.productName}</p>
                              <p className="text-[10px] text-slate-400">
                                Qty: {item.quantity} • ${item.price.toFixed(2)} each
                              </p>
                            </div>
                            <span className="text-xs font-bold text-slate-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer total */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 font-medium">
                          Shipping to: <strong className="text-slate-800">{order.shippingAddress.city}, {order.shippingAddress.state}</strong>
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-900">No orders placed yet</p>
                  <p className="text-xs text-slate-500 mt-1 mb-4">When you purchase products, your history will appear here.</p>
                  <Link to="/shop" className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 2. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                Personal Information
              </h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Saved Addresses</h2>
                <button className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 relative space-y-2">
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full uppercase">
                        Default Address
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-slate-900">{addr.fullName}</h3>
                    <p className="text-xs text-slate-600">{addr.addressLine1}</p>
                    <p className="text-xs text-slate-600">{addr.city}, {addr.state} {addr.postalCode}</p>
                    <p className="text-xs text-slate-500">{addr.country} • {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SAVED WISHLIST TAB */}
          {activeTab === 'saved' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                Saved Wishlist Items
              </h2>

              {savedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {savedProducts.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-white" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                        <p className="text-xs font-black text-indigo-600">${p.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No products saved in your wishlist yet.</p>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
