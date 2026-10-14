import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Order } from '../types/ecommerce';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartShipping, cartTax, cartTotal, placeOrder } = useShop();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields State
  const [customerName, setCustomerName] = useState(user?.name || 'Alex Rivers');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'alex.rivers@example.com');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+1 (555) 019-2834');

  const [addressLine1, setAddressLine1] = useState(user?.addresses[0]?.addressLine1 || '742 Evergreen Terrace');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Springfield');
  const [state, setState] = useState(user?.addresses[0]?.state || 'IL');
  const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || '62704');
  const [country, setCountry] = useState('United States');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="max-w-md mx-auto my-20 text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">No items in cart</h2>
        <p className="text-xs text-slate-500 mb-6">Please add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      showToast('Please provide your name and email', 'warning');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1 || !city || !state || !postalCode) {
      showToast('Please complete all required address fields', 'warning');
      return;
    }
    setStep(3);
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shippingAddress = {
      id: `addr-${Date.now()}`,
      fullName: customerName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone: customerPhone
    };

    const paymentLabel =
      paymentMethod === 'card'
        ? `Credit Card (${cardNumber.slice(-4)})`
        : paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : 'PayPal Express';

    const newOrder = placeOrder(
      shippingAddress,
      paymentLabel,
      { name: customerName, email: customerEmail }
    );

    if (newOrder) {
      setCreatedOrder(newOrder);
      setStep(4);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Visual Stepper Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0" />
          
          {[
            { id: 1, name: 'Information' },
            { id: 2, name: 'Shipping' },
            { id: 3, name: 'Payment' },
            { id: 4, name: 'Confirmation' }
          ].map((s) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;

            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={`text-[11px] font-bold mt-2 ${
                    isCurrent ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                >
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {step === 4 && createdOrder ? (
        /* STEP 4: CONFIRMATION SUCCESS */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Placed
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Thank You for Your Order!</h1>
            <p className="text-sm text-slate-600 mt-1">
              We have sent an order confirmation email to <strong className="text-slate-900">{createdOrder.customerEmail}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4 text-xs text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-slate-900">Order Number:</span>
              <span className="font-black text-indigo-600">{createdOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-slate-900">Tracking Number:</span>
              <span className="font-mono text-slate-800">{createdOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-slate-900">Estimated Delivery:</span>
              <span className="font-bold text-slate-900">{createdOrder.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-900">Total Paid:</span>
              <span className="font-black text-slate-900 text-sm">${createdOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to={`/order-tracking?q=${createdOrder.orderNumber}`}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" /> Live Track Package Status
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3.5 rounded-xl text-xs transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        /* STEPS 1-3 FORM & SUMMARY */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
            
            {/* STEP 1: CUSTOMER INFO */}
            {step === 1 && (
              <form onSubmit={handleStep1Next} className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" /> Customer Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Rivers"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="alex.rivers@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Continue to Shipping Address <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {step === 2 && (
              <form onSubmit={handleStep2Next} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-indigo-600" /> Shipping Details
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Springfield"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="IL"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="62704"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Continue to Payment Method <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrderSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" /> Payment Selection
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                {/* Radio selection */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-indigo-600" />
                    <span className="text-xs">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-5 h-5 mx-auto mb-1.5 text-emerald-600" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-black text-xs text-sky-600 mb-1">PayPal</span>
                    <span className="text-[11px] text-slate-500">Express</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" /> Complete & Pay ${cartTotal.toFixed(2)}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Sticky Order Summary */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-slate-900">
                    {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-bold text-slate-900">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
