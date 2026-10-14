import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Product,
  Category,
  CartItem,
  Coupon,
  Order,
  OrderStatus,
  FilterState
} from '../types/ecommerce';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS
} from '../data/mockProducts';
import { useToast } from './ToastContext';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  coupons: Coupon[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  appliedCoupon: Coupon | null;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Cart Calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: () => void;
  clearWishlist: () => void;

  // Coupon
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Order Placement & Tracking
  placeOrder: (shippingDetails: any, paymentMethod: string, customerInfo: { name: string; email: string }) => Order | null;
  getOrderByIdOrNumber: (query: string) => Order | undefined;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addCategory: (category: Category) => void;
  addCoupon: (coupon: Coupon) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'novamart_products_v1',
  CART: 'novamart_cart_v1',
  WISHLIST: 'novamart_wishlist_v1',
  COUPON: 'novamart_coupon_v1',
  ORDERS: 'novamart_orders_v1',
  CATEGORIES: 'novamart_categories_v1',
  COUPONS_LIST: 'novamart_coupons_list_v1'
};

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'all',
  priceRange: [0, 600],
  brands: [],
  ratings: [],
  inStockOnly: false,
  onSaleOnly: false,
  sortBy: 'featured'
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CATEGORIES;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS_LIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COUPONS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prod-1', 'prod-4']; // default preset wishlist items
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPON);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Modals & UI filters
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
    }
  }, [appliedCoupon]);

  // Cart Actions
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || (product.colors?.[0]?.name);
    const size = selectedSize || (product.sizes?.[0]);
    const cartItemId = `${product.id}-${color || 'none'}-${size || 'none'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" to your cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal === 0) return 0;
    if (appliedCoupon.code === 'FREESHIP') return 0;
    
    let amount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    if (appliedCoupon.maxDiscount && amount > appliedCoupon.maxDiscount) {
      amount = appliedCoupon.maxDiscount;
    }
    return Math.min(amount, cartSubtotal);
  }, [cartSubtotal, appliedCoupon]);

  const cartShipping = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (appliedCoupon?.code === 'FREESHIP' || cartSubtotal >= 50) return 0;
    return 9.99;
  }, [cartSubtotal, appliedCoupon]);

  const cartTax = useMemo(() => {
    const taxable = Math.max(0, cartSubtotal - cartDiscount);
    return taxable * 0.08; // 8% tax
  }, [cartSubtotal, cartDiscount]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);
  }, [cartSubtotal, cartDiscount, cartShipping, cartTax]);

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = products.find((p) => p.id === productId);
    const prodName = prod ? prod.name : 'Product';

    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed "${prodName}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved "${prodName}" to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = () => {
    if (wishlist.length === 0) return;
    let addedCount = 0;
    wishlist.forEach((id) => {
      const prod = products.find((p) => p.id === id);
      if (prod) {
        addToCart(prod, 1);
        addedCount++;
      }
    });
    setWishlist([]);
    showToast(`Moved ${addedCount} wishlist items to cart!`, 'success');
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === formatted);

    if (!found) {
      showToast('Invalid promo code. Try SAVE10, WELCOME20, or FREESHIP.', 'error');
      return false;
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      showToast(`This coupon requires a minimum spend of $${found.minSpend}`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Order Placement
  const placeOrder = (
    shippingDetails: any,
    paymentMethod: string,
    customerInfo: { name: string; email: string }
  ) => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return null;
    }

    const orderNumber = `NM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString(),
      customerName: customerInfo.name || 'Valued Customer',
      customerEmail: customerInfo.email || 'customer@novamart.com',
      status: 'Processing',
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: shippingDetails,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      estimatedDelivery: estDate.toISOString().split('T')[0],
      trackingNumber: `TRK-${Math.floor(1000000000 + Math.random() * 9000000000)}-US`,
      carrier: 'FedEx Express'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${orderNumber} placed successfully!`, 'success');

    return newOrder;
  };

  const getOrderByIdOrNumber = (query: string) => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (o) => o.id === query || o.orderNumber.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean
    );
  };

  // Admin Functions
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      rating: newProdData.rating || 5.0,
      reviewCount: newProdData.reviewCount || 0,
      reviews: newProdData.reviews || []
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added new product: "${newProduct.name}"`, 'success');
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from catalog', 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to ${status}`, 'success');
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
    showToast(`New category added: ${category.name}`, 'success');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
    showToast(`New coupon added: ${coupon.code}`, 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        coupons,
        orders,
        cart,
        wishlist,
        appliedCoupon,
        quickViewProduct,
        setQuickViewProduct,
        filters,
        setFilters,
        resetFilters,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        cartItemCount,

        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        clearWishlist,

        applyCoupon,
        removeCoupon,

        placeOrder,
        getOrderByIdOrNumber,

        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCategory,
        addCoupon
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
