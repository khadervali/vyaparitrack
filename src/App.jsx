import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import AboutPage from '@/pages/AboutPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import FeaturesPage from '@/pages/FeaturesPage';
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import UpdatesPage from '@/pages/UpdatesPage';
import CareersPage from '@/pages/CareersPage';
import BlogPage from '@/pages/BlogPage';
import HelpPage from '@/pages/HelpPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';

import AppLayout from '@/components/layout/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import InventoryPage from '@/pages/app/InventoryPage';
import SalesPage from '@/pages/app/SalesPage';
import PurchasesPage from '@/pages/app/PurchasesPage';
import ReportsPage from '@/pages/app/ReportsPage';
import GstToolsPage from '@/pages/app/GstToolsPage';
import SettingsPage from '@/pages/app/SettingsPage';
import UserProfilePage from '@/pages/app/UserProfilePage';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('vyaparitrack_currentUser'));
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('vyaparitrack-theme');
    if (!savedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vyaparitrack-theme', 'dark');
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsAuthResolved(true); 
  }, []);

  if (!isAuthResolved) {
    return <div className="flex items-center justify-center min-h-screen bg-background text-foreground">Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background dark:from-background dark:via-primary/5 dark:to-background">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>
          
          <Route 
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="gst-tools" element={<GstToolsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
          
          {/* Redirect /dashboard to /app/dashboard for legacy compatibility if needed */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />

        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;