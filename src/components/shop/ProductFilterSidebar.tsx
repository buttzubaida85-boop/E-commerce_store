import React from 'react';
import { Star, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const ProductFilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { categories, products, filters, setFilters, resetFilters } = useShop();

  // Extract unique brands
  const allBrands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

  const handleCategoryChange = (categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categorySlug ? 'all' : categorySlug
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const handleRatingToggle = (rating: number) => {
    setFilters((prev) => {
      const exists = prev.ratings.includes(rating);
      return {
        ...prev,
        ratings: exists ? prev.ratings.filter((r) => r !== rating) : [...prev.ratings, rating]
      };
    });
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Categories</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-80">{products.length}</span>
          </button>
          {categories.map((cat) => {
            const catCount = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
            const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase() || filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {catCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Price Range</h4>
          <span className="text-xs font-bold text-indigo-600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="600"
          step="10"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)]
            }))
          }
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>$0</span>
          <span>$300</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Special Quick Badges / Availability */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Promotions & Stock</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, onSaleOnly: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1 font-semibold text-rose-600">
              <Sparkles className="w-3.5 h-3.5" /> On Sale Only
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Brands */}
      {allBrands.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Brand</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {allBrands.map((brand) => {
              const checked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{brand}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Customer Rating</h4>
        <div className="space-y-1.5">
          {[5, 4, 3].map((star) => {
            const isChecked = filters.ratings.includes(star);
            return (
              <button
                key={star}
                onClick={() => handleRatingToggle(star)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  isChecked ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: star }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span>{star} Stars & Above</span>
                </div>
                {isChecked && <Check className="w-4 h-4 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {onCloseMobile && (
        <button
          onClick={onCloseMobile}
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs mt-4"
        >
          Apply Filters
        </button>
      )}

    </div>
  );
};
