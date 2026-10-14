import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  X,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 max-w-lg mx-auto border border-slate-100 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Shopping Cart is Empty</h2>
          <p className="text-sm text-slate-500">
            Looks like you haven't added anything to your cart yet. Discover our curated collection today!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-2xl text-xs transition-colors shadow-md"
          >
            Start Shopping Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-8">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Your Selection</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Item Table/List */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
            {cart.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  
                  {/* Image */}
                  <Link to={`/product/${item.product.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="block text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>

                    {/* Variant badges */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-xs text-slate-500">
                      {item.selectedColor && (
                        <span>Color: <strong className="text-slate-800">{item.selectedColor}</strong></span>
                      )}
                      {item.selectedColor && item.selectedSize && <span>•</span>}
                      {item.selectedSize && (
                        <span>Size: <strong className="text-slate-800">{item.selectedSize}</strong></span>
                      )}
                    </div>

                    <p className="text-sm font-black text-slate-900 mt-2 sm:hidden">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-20 hidden sm:block">
                      <p className="text-base font-black text-slate-900">${itemTotal.toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400">${item.product.price.toFixed(2)} ea</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleWishlist(item.product.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Save to Wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              to="/shop"
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              ← Continue Shopping Catalog
            </Link>
          </div>

        </div>

        {/* Right Order Summary Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h3>

            {/* Promo code field */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Promo Code
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-900">{appliedCoupon.code} Applied</p>
                      <p className="text-[10px] text-emerald-700">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-emerald-700 hover:text-emerald-900"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="SAVE10, WELCOME20, etc."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 uppercase outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-900">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-600 uppercase font-black text-[10px]">FREE</span>
                  ) : (
                    `$${cartShipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-bold text-slate-900">${cartTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Grand Total</span>
                <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl text-xs transition-all shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Guaranteed 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
