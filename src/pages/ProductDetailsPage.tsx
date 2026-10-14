import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ReviewModal } from '../components/shop/ReviewModal';
import { ProductCard } from '../components/shop/ProductCard';
import { Review } from '../types/ecommerce';
import { useToast } from '../context/ToastContext';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, addToCart, toggleWishlist, isInWishlist, updateProduct } = useShop();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">The product you are looking for may have been removed or renamed.</p>
        <Link to="/shop" className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs">
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleAddReview = (newReview: Review) => {
    const updatedReviews = [newReview, ...product.reviews];
    const newRating =
      updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;

    updateProduct(product.id, {
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      rating: Number(newRating.toFixed(1))
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-slate-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-600">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-slate-600">{product.category}</Link>
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-xs group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gallery Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.discount && (
                <span className="bg-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="bg-indigo-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  NEW ARRIVAL
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
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
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-semibold"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">SKU: {product.sku}</span>
              <span className="text-slate-300">•</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">
                  Save ${((product.originalPrice || 0) - product.price).toFixed(2)} ({product.discount}%)
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Select Color: <span className="font-semibold text-indigo-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === c.name ? 'border-indigo-600 ring-4 ring-indigo-100 scale-110' : 'border-slate-200 hover:scale-105'
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

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Select Size: <span className="font-semibold text-indigo-600">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
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
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-5 py-2 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-2xl text-sm transition-all shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  isSaved
                    ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl text-sm transition-all shadow-md"
            >
              Buy Now with Express Checkout
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-center pt-6 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Free 2-Day Express</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              <span>30-Day Easy Return</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>100% Genuine Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* TABS SECTION: Description, Specifications, Reviews, Shipping */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 sm:p-10 mb-16">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-slate-200 pb-4 overflow-x-auto">
          {[
            { key: 'desc', label: 'Product Description' },
            { key: 'specs', label: `Specifications (${product.specifications?.length || 0})` },
            { key: 'reviews', label: `Customer Reviews (${product.reviews?.length || 0})` },
            { key: 'shipping', label: 'Shipping & Returns' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`text-sm font-bold pb-2 transition-all shrink-0 border-b-2 -mb-4.5 ${
                activeTab === tab.key
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-slate-400 hover:text-slate-700 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          
          {/* 1. Description Tab */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed max-w-4xl">
              <p>{product.description}</p>
              <h4 className="text-base font-bold text-slate-900 pt-4">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Designed for long-lasting durability and daily comfort.</li>
                <li>Premium materials engineered to withstand wear and tear.</li>
                <li>Comes in official protective packaging with full manufacturer warranty.</li>
                <li>Seamlessly fits into modern active lifestyles.</li>
              </ul>
            </div>
          )}

          {/* 2. Specifications Tab Table */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex p-4 text-xs sm:text-sm odd:bg-slate-50/50">
                    <span className="w-1/3 font-bold text-slate-900">{spec.label}</span>
                    <span className="w-2/3 text-slate-600 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Customer Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-4xl font-black text-slate-900">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-400 block font-medium">out of 5.0</span>
                  </div>
                  <div>
                    <div className="flex text-amber-400 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-600">
                      Based on {product.reviews.length} verified customer reviews
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
                >
                  <MessageSquarePlus className="w-4 h-4" /> Write a Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl border border-slate-100 bg-white space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{rev.userName}</span>
                        {rev.verified && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <h5 className="text-sm font-bold text-slate-900">{rev.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.review}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 4. Shipping & Returns */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-slate-600 max-w-3xl leading-relaxed">
              <h4 className="font-bold text-slate-900 text-base">Free Express Delivery</h4>
              <p>
                All orders over $50 qualify for free express courier shipping. Standard dispatch takes 24 hours. Transit time is typically 2-3 business days.
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">30-Day Hassle-Free Returns</h4>
              <p>
                If you are not 100% satisfied with your item, you can return it within 30 days of receiving your package for a full refund or exchange. Items must be in original condition.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        product={product}
        onAddReview={handleAddReview}
      />

    </div>
  );
};
