import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoriesPage: React.FC = () => {
  const { categories, setFilters } = useShop();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({ ...prev, category: categoryName }));
    navigate(`/shop?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Curated Collections
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
          Explore Product Categories
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          From cutting-edge audio and wearables to artisan leather and organic skincare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group relative bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {cat.productCount} Products
                </span>
                <h3 className="text-xl font-black mt-1 text-white">{cat.name}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              <button className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1.5 transition-colors">
                Browse {cat.name} Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
