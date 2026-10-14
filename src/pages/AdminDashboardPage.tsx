import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Search,
  Eye,
  CheckCircle2,
  TrendingUp,
  Tag,
  ShieldAlert,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Product, Order, OrderStatus } from '../types/ecommerce';
import { Modal } from '../components/ui/Modal';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useShop();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Product Add/Edit
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Electronics');
  const [prodBrand, setProdBrand] = useState('NOVA MART');
  const [prodPrice, setProdPrice] = useState('99.99');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('129.99');
  const [prodStock, setProdStock] = useState('25');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImages, setProdImages] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800');
  const [prodFeatured, setProdFeatured] = useState(false);
  const [prodDeal, setProdDeal] = useState(false);

  // Selected Order Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 text-center bg-white p-8 rounded-3xl border border-rose-100 shadow-xl space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-xs text-slate-500">
          You must be logged in as an Administrator to view the management console.
        </p>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const openAddModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Electronics');
    setProdBrand('NOVA MART');
    setProdPrice('99.99');
    setProdOriginalPrice('129.99');
    setProdStock('25');
    setProdDesc('High quality curated merchandise.');
    setProdImages('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800');
    setProdFeatured(false);
    setProdDeal(false);
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdBrand(p.brand);
    setProdPrice(p.price.toString());
    setProdOriginalPrice((p.originalPrice || p.price).toString());
    setProdStock(p.stock.toString());
    setProdDesc(p.description);
    setProdImages(p.images.join(', '));
    setProdFeatured(p.featured);
    setProdDeal(!!p.dealOfDay);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(prodPrice) || 0;
    const origPriceNum = parseFloat(prodOriginalPrice) || priceNum;
    const stockNum = parseInt(prodStock, 10) || 0;
    const imageList = prodImages.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: prodName,
        category: prodCategory,
        brand: prodBrand,
        price: priceNum,
        originalPrice: origPriceNum,
        stock: stockNum,
        description: prodDesc,
        images: imageList.length ? imageList : [prodImages],
        featured: prodFeatured,
        dealOfDay: prodDeal
      });
      showToast('Product updated successfully!', 'success');
    } else {
      const slug = prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct({
        name: prodName,
        slug,
        category: prodCategory,
        brand: prodBrand,
        price: priceNum,
        originalPrice: origPriceNum,
        stock: stockNum,
        description: prodDesc,
        shortDescription: prodDesc.slice(0, 100),
        images: imageList.length ? imageList : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
        rating: 5.0,
        reviewCount: 1,
        featured: prodFeatured,
        dealOfDay: prodDeal,
        sku: `SKU-${Date.now()}`,
        specifications: [{ label: 'Condition', value: 'Brand New' }],
        reviews: []
      });
      showToast('New product added to catalog!', 'success');
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      showToast('Product deleted from inventory', 'info');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Admin Console
          </span>
          <h1 className="text-3xl font-black text-white mt-2">NOVA MART Control Center</h1>
          <p className="text-xs text-slate-400 mt-1">Manage products, customer orders, stock levels, and store analytics.</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-colors shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-black text-slate-900 mt-1">${totalRevenue.toFixed(2)}</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% this month
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalOrders}</p>
            <p className="text-[10px] text-indigo-600 font-bold mt-1">Active Fulfillment</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Inventory</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{products.length}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Catalog SKUs</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Warning</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{lowStockCount}</p>
            <p className="text-[10px] text-rose-500 font-medium mt-1">&lt; 5 items remaining</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Store Overview' },
          { id: 'products', label: `Manage Inventory (${products.length})` },
          { id: 'orders', label: `Manage Orders (${orders.length})` },
          { id: 'coupons', label: 'Coupons & Discounts' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === t.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Low Stock Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Low Stock Alerts</span>
              <span className="text-xs text-rose-500 font-bold">{lowStockCount} Items</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {products.filter((p) => p.stock < 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-white" />
                    <div>
                      <p className="font-bold text-slate-900 truncate max-w-xs">{p.name}</p>
                      <p className="text-[10px] text-slate-500">SKU: {p.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-rose-600 block">{p.stock} left</span>
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-[10px] font-bold text-indigo-600 hover:underline"
                    >
                      Restock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Recent Activity
            </h3>

            <div className="space-y-3">
              {orders.slice(0, 4).map((o) => (
                <div key={o.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{o.orderNumber}</p>
                    <p className="text-[10px] text-slate-500">{o.customerName} • ${o.total.toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT TABLE */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search inventory..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={openAddModal}
              className="bg-slate-900 hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-slate-100" />
                      <div className="min-w-0">
                        <p className="truncate max-w-xs">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{p.brand}</p>
                      </div>
                    </td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 font-black text-slate-900">${p.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`font-bold px-2 py-0.5 rounded-full ${p.stock < 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 space-x-1">
                      {p.featured && <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Featured</span>}
                      {p.dealOfDay && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Deal</span>}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 space-y-6">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search orders by ID, email, customer..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{o.customerName}</p>
                      <p className="text-[10px] text-slate-400">{o.customerEmail}</p>
                    </td>
                    <td className="p-3">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="p-3 font-black text-slate-900">${o.total.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : o.status === 'Shipped'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => {
                          updateOrderStatus(o.id, e.target.value as OrderStatus);
                          showToast(`Updated ${o.orderNumber} status to ${e.target.value}`, 'success');
                        }}
                        className="bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl px-2.5 py-1 outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Active Promo Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { code: 'SAVE10', discount: '10%', desc: '10% off any order' },
              { code: 'WELCOME20', discount: '20%', desc: '20% off first order' },
              { code: 'FREESHIP', discount: '$5.99 Off', desc: 'Free express shipping' }
            ].map((c) => (
              <div key={c.code} className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-mono font-black text-indigo-900 text-base">{c.code}</span>
                  <p className="text-xs text-slate-600 mt-1">{c.desc}</p>
                </div>
                <span className="bg-indigo-600 text-white font-bold text-xs px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={editingProduct ? 'Edit Product Catalog Item' : 'Add New Inventory Item'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                placeholder="e.g. Apex Pro Wireless Headphones"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Sale Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Original Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={prodOriginalPrice}
                onChange={(e) => setProdOriginalPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={prodStock}
                onChange={(e) => setProdStock(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Image URL(s)
            </label>
            <input
              type="text"
              required
              value={prodImages}
              onChange={(e) => setProdImages(e.target.value)}
              placeholder="Comma separated image URLs"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={prodDesc}
              onChange={(e) => setProdDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={prodFeatured}
                onChange={(e) => setProdFeatured(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Mark as Featured Product
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={prodDeal}
                onChange={(e) => setProdDeal(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Deal of the Day
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              {editingProduct ? 'Save Product Changes' : 'Add to Catalog'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
