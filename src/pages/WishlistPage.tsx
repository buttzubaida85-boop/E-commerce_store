import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, moveWishlistToCart, clearWishlist } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
            Saved Favorites
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">My Wishlist ({savedProducts.length})</h1>
        </div>

        {savedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={moveWishlistToCart}
              className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="text-slate-400 hover:text-rose-500 p-2.5 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors"
              title="Clear Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-500 hover:bg-rose-50 transition-colors shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{p.category}</span>
                  <Link
                    to={`/product/${p.slug}`}
                    className="block text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 mt-1 mb-2"
                  >
                    {p.name}
                  </Link>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-black text-slate-900">${p.price.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">${p.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(p, 1)}
                  disabled={p.stock <= 0}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h3>
          <p className="text-sm text-slate-500">
            Keep track of items you love by tapping the heart icon on any product.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors"
          >
            Explore Shop Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
};
