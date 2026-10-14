export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  verified: boolean;
  helpfulCount?: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // e.g. "Electronics", "Fashion", "Beauty", "Home & Living", "Sports", "Accessories"
  brand: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percentage
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  sku: string;
  specifications: ProductSpecification[];
  reviews: Review[];
  featured?: boolean;
  isNew?: boolean;
  dealOfDay?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description: string;
  iconName?: string;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique identifier (productId + color + size)
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minSpend?: number;
  description: string;
  validUntil?: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  estimatedDelivery: string;
  trackingNumber: string;
  carrier?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  phone?: string;
  addresses: Address[];
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
