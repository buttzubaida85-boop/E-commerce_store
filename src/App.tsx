import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { ToastContainer } from './components/ui/ToastContainer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { UserAccountPage } from './pages/UserAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPages } from './pages/PolicyPages';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <ShopProvider>
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
              
              {/* Promo Announcement Banner */}
              <AnnouncementBar />

              {/* Main Sticky Header */}
              <Header />

              {/* Dynamic Page Routes */}
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/order-tracking" element={<OrderTrackingPage />} />
                  <Route path="/account" element={<UserAccountPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/policy/:type" element={<PolicyPages />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              {/* Footer */}
              <Footer />

              {/* Global Quick View Modal & Toast Notifications */}
              <QuickViewModal />
              <ToastContainer />

            </div>
          </ShopProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
