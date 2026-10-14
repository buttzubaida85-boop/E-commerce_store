import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.images[0]);
      setSelectedColor(quickViewProduct.colors?.[0]?.name || '');
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
    navigate('/checkout');
  };

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      title="Quick Product Preview"
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Gallery */}
        <div>
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 mb-4">
            <img
              src={selectedImage || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-indigo-600 scale-105 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-indigo-600 uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <span>SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-2 leading-snug">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-sm font-bold text-slate-900">
                {quickViewProduct.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">({quickViewProduct.reviewCount} customer reviews)</span>
              <span className="text-slate-300">•</span>
              <span className={`text-xs font-bold ${quickViewProduct.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} In Stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-black text-slate-900">
                ${quickViewProduct.price.toFixed(2)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${quickViewProduct.originalPrice.toFixed(2)}
                </span>
              )}
              {quickViewProduct.discount && (
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Save {quickViewProduct.discount}%
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Colors */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Color: <span className="font-medium text-slate-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === c.name ? 'border-indigo-600 ring-2 ring-indigo-200 scale-110' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-4 h-4 ${c.hex === '#ffffff' || c.hex === '#f5f5f4' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Size: <span className="font-medium text-slate-600">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-rose-50 text-rose-500 border-rose-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={quickViewProduct.stock <= 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-sm"
            >
              Buy Now
            </button>

            <Link
              to={`/product/${quickViewProduct.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2 flex items-center justify-center gap-1"
            >
              View Full Details & Customer Reviews <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </Modal>
  );
};
