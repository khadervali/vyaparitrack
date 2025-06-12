import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Lazy loaded pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));

// App pages
const InventoryPage = lazy(() => import('@/pages/app/InventoryPage'));
const CategoriesPage = lazy(() => import('@/pages/app/inventory/CategoriesPage'));
const LowStockPage = lazy(() => import('@/pages/app/inventory/LowStockPage'));
const StockTransferPage = lazy(() => import('@/pages/app/inventory/StockTransferPage'));
const SalesPage = lazy(() => import('@/pages/app/SalesPage'));
const PurchasesPage = lazy(() => import('@/pages/app/PurchasesPage'));
const ReportsPage = lazy(() => import('@/pages/app/ReportsPage'));
const GstToolsPage = lazy(() => import('@/pages/app/GstToolsPage'));
const VendorsPage = lazy(() => import('@/pages/app/VendorsPage'));
const SettingsPage = lazy(() => import('@/pages/app/SettingsPage'));
const UserProfilePage = lazy(() => import('@/pages/app/UserProfilePage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Auth guard component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes with Navbar and Footer */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <LandingPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/features" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <FeaturesPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <PricingPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <ContactPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <PrivacyPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Navbar />
              <main className="min-h-[calc(100vh-64px-80px)]">
                <TermsPage />
              </main>
              <Footer />
            </>
          } />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected app routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/categories" element={<CategoriesPage />} />
            <Route path="inventory/low-stock" element={<LowStockPage />} />
            <Route path="inventory/transfers" element={<StockTransferPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="gst" element={<GstToolsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;