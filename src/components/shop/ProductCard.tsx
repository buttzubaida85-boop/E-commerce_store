import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const isSaved = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount && product.discount > 0 ? (
          <span className="bg-rose-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
            -{product.discount}% OFF
          </span>
        ) : null}
        {product.isNew && (
          <span className="bg-indigo-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Heart Action Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isSaved
            ? 'bg-rose-50 text-rose-500 shadow-md scale-110'
            : 'bg-white/80 backdrop-blur-xs text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
        }`}
        title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Image Container with Hover Scale & Quick View Overlay */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-square bg-slate-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Hover Quick View overlay button */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="bg-white/95 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-600">
              {product.category}
            </span>
            <span className="font-medium text-slate-500">{product.brand}</span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="block text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add To Cart Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
              product.stock > 0
                ? 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title={product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{product.stock > 0 ? 'Add' : 'Sold Out'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
