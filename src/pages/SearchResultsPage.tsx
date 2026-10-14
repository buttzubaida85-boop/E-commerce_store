import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shop/ProductCard';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, categories, setFilters } = useShop();

  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Search Results
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          {query ? `Results for "${query}"` : 'Search Our Products'}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Found {matchingProducts.length} matching items
        </p>
      </div>

      {matchingProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No products found matching "{query}"</h3>
          <p className="text-sm text-slate-500">
            Check your spelling or try searching for broader keywords like "headphones", "shoes", or "lamp".
          </p>

          <div className="pt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setFilters((f) => ({ ...f, category: cat.name }))}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
