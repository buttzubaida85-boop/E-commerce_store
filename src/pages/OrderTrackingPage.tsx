import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, CheckCircle2, Clock, Truck, Package, MapPin, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types/ecommerce';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam || 'NM-2026-10482');
  const { getOrderByIdOrNumber, orders } = useShop();

  const [activeOrder, setActiveOrder] = useState(() => getOrderByIdOrNumber(queryParam || 'NM-2026-10482'));

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      setActiveOrder(getOrderByIdOrNumber(queryParam));
    }
  }, [queryParam, getOrderByIdOrNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveOrder(getOrderByIdOrNumber(query.trim()));
    }
  };

  const statusSteps: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepStatus = (stepName: OrderStatus) => {
    if (!activeOrder) return 'upcoming';
    if (activeOrder.status === 'Cancelled') return 'cancelled';

    const currentIndex = statusSteps.indexOf(activeOrder.status);
    const stepIndex = statusSteps.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs text-center space-y-4">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Live Shipment Status
        </span>
        <h1 className="text-3xl font-black text-slate-900">Track Your Package</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enter your Order Number (e.g. <strong className="text-slate-800">NM-2026-10482</strong>) or Tracking ID to get live status updates.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="NM-2026-10482"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none uppercase"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-colors shadow-md"
          >
            Track Order
          </button>
        </form>
      </div>

      {activeOrder ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 sm:p-10 space-y-8">
          
          {/* Summary Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs text-slate-400 font-medium">Order Reference</span>
              <h2 className="text-2xl font-black text-slate-900">{activeOrder.orderNumber}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Placed on {new Date(activeOrder.date).toLocaleDateString()}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-medium">Estimated Delivery</span>
              <p className="text-lg font-black text-emerald-600">{activeOrder.estimatedDelivery}</p>
              <p className="text-xs text-slate-500">{activeOrder.carrier} • {activeOrder.trackingNumber}</p>
            </div>
          </div>

          {/* Timeline Progress */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-6">Delivery Timeline</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
              {statusSteps.map((s, idx) => {
                const status = getStepStatus(s);
                return (
                  <div key={s} className="flex sm:flex-col items-center gap-3 sm:text-center relative">
                    <div
                      className={`w-10 h-10 rounded-2xl font-bold text-xs flex items-center justify-center shrink-0 transition-all ${
                        status === 'completed'
                          ? 'bg-emerald-500 text-white shadow-md'
                          : status === 'current'
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg animate-pulse'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-bold ${
                          status === 'current' ? 'text-indigo-600' : status === 'completed' ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {s}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {status === 'completed'
                          ? 'Completed'
                          : status === 'current'
                          ? 'In Progress'
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Address Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-600" /> Shipping Destination
              </h4>
              <p className="text-xs font-bold text-slate-900">{activeOrder.shippingAddress.fullName}</p>
              <p className="text-xs text-slate-600">{activeOrder.shippingAddress.addressLine1}</p>
              <p className="text-xs text-slate-600">
                {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.postalCode}
              </p>
              <p className="text-xs text-slate-500 pt-1">{activeOrder.shippingAddress.phone}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-indigo-600" /> Payment & Total
              </h4>
              <p className="text-xs font-bold text-slate-900">{activeOrder.paymentMethod}</p>
              <p className="text-xs text-slate-600">Subtotal: ${activeOrder.subtotal.toFixed(2)}</p>
              <p className="text-xs text-slate-600">Shipping: ${activeOrder.shipping.toFixed(2)}</p>
              <p className="text-sm font-black text-slate-900 pt-1">
                Grand Total: ${activeOrder.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Package items */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Items in Shipment ({activeOrder.items.length})
            </h4>
            <div className="space-y-3">
              {activeOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.productName}</p>
                    <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-3 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Order Not Found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find an active order matching "{query}". Try checking your confirmation email for the exact order ID.
          </p>
        </div>
      )}

    </div>
  );
};
