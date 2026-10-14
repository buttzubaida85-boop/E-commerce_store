import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductFilterSidebar } from '../components/shop/ProductFilterSidebar';
import { Product } from '../types/ecommerce';

export const ShopPage: React.FC = () => {
  const { products, filters, setFilters, resetFilters } = useShop();
  const [searchParams] = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync search params from URL (e.g. ?category=electronics or ?deals=true)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const dealsParam = searchParams.get('deals');
    const sortParam = searchParams.get('sort');

    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
    if (dealsParam === 'true') {
      setFilters((prev) => ({ ...prev, onSaleOnly: true }));
    }
    if (sortParam) {
      setFilters((prev) => ({ ...prev, sortBy: sortParam as any }));
    }
  }, [searchParams, setFilters]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Category
      if (filters.category && filters.category !== 'all') {
        const cat = filters.category.toLowerCase();
        if (p.category.toLowerCase() !== cat && p.slug.toLowerCase() !== cat) {
          return false;
        }
      }

      // Price Range
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
        return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      // Ratings
      if (filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        if (p.rating < minRating) return false;
      }

      // Stock
      if (filters.inStockOnly && p.stock <= 0) {
        return false;
      }

      // Sale
      if (filters.onSaleOnly && (!p.discount || p.discount <= 0)) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  // Sorted Products
  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (filters.sortBy) {
      case 'price-low':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return copy.sort((a, b) => b.price - a.price);
      case 'rating':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'featured':
      default:
        return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, filters.sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">Shop Catalog</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">Explore Store Catalog</h1>
        <p className="text-sm text-slate-500 mt-1">
          Showing {sortedProducts.length} high quality products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Left Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs h-fit sticky top-24">
          <ProductFilterSidebar />
        </aside>

        {/* Main Catalog Column */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar: Mobile Filter Toggle, Active Filter Chips, Sort & View Mode */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
            </button>

            {/* Total Results */}
            <p className="text-xs font-bold text-slate-600 hidden sm:block">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'} Found
            </p>

            {/* Right Controls: Sort & Grid/List Toggle */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Chips */}
          {(filters.category !== 'all' ||
            filters.onSaleOnly ||
            filters.inStockOnly ||
            filters.search ||
            filters.brands.length > 0) && (
            <div className="flex items-center gap-2 flex-wrap text-xs bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
              <span className="font-bold text-indigo-900">Active Filters:</span>
              {filters.search && (
                <span className="bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 font-medium flex items-center gap-1">
                  Query: "{filters.search}"
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((f) => ({ ...f, search: '' }))}
                  />
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 font-medium flex items-center gap-1">
                  Category: {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}
                  />
                </span>
              )}
              {filters.onSaleOnly && (
                <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-200 font-medium flex items-center gap-1">
                  On Sale
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((f) => ({ ...f, onSaleOnly: false }))}
                  />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-indigo-600 hover:underline ml-auto flex items-center gap-1"
              >
                Clear All <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Product Grid / List Display */}
          {paginatedProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No Matching Products Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any products matching your specific filters. Try clearing some filters or searching for another keyword.
              </p>
              <button
                onClick={resetFilters}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </main>

      </div>

      {/* Mobile Bottom Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto z-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ProductFilterSidebar onCloseMobile={() => setMobileFiltersOpen(false)} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
