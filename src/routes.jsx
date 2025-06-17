import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import PublicLayout from '@/components/layout/PublicLayout';
import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import SignupPage from '@/pages/auth/SignupPage';
import DashboardPage from '@/pages/app/DashboardPage';
import InventoryPage from '@/pages/app/InventoryPage';
import LowStockPage from '@/pages/app/LowStockPage';
import SalesPage from '@/pages/app/SalesPage';
import PurchasesPage from '@/pages/app/PurchasesPage';
import ReportsPage from '@/pages/app/ReportsPage';
import CustomersPage from '@/pages/app/CustomersPage';
import ProfilePage from '@/pages/app/ProfilePage';
import SettingsPage from '@/pages/app/SettingsPage';
import GstToolsPage from '@/pages/app/GstToolsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LandingPage from '@/pages/LandingPage';
import FeaturesPage from '@/pages/FeaturesPage';
import PricingPage from '@/pages/PricingPage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import HelpPage from '@/pages/HelpPage';
import UpdatesPage from '@/pages/UpdatesPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import CareersPage from '@/pages/CareersPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route component (redirects to app if already authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return !isAuthenticated ? children : <Navigate to="/app/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicRoute><PublicLayout><LandingPage /></PublicLayout></PublicRoute>} />
      <Route path="/features" element={<PublicRoute><PublicLayout><FeaturesPage /></PublicLayout></PublicRoute>} />
      <Route path="/pricing" element={<PublicRoute><PublicLayout><PricingPage /></PublicLayout></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><PublicLayout><AboutPage /></PublicLayout></PublicRoute>} />
      <Route path="/blog" element={<PublicRoute><PublicLayout><BlogPage /></PublicLayout></PublicRoute>} />
      <Route path="/help" element={<PublicRoute><PublicLayout><HelpPage /></PublicLayout></PublicRoute>} />
      <Route path="/updates" element={<PublicRoute><PublicLayout><UpdatesPage /></PublicLayout></PublicRoute>} />
      <Route path="/integrations" element={<PublicRoute><PublicLayout><IntegrationsPage /></PublicLayout></PublicRoute>} />
      <Route path="/careers" element={<PublicRoute><PublicLayout><CareersPage /></PublicLayout></PublicRoute>} />
      <Route path="/contact" element={<PublicRoute><PublicLayout><ContactPage /></PublicLayout></PublicRoute>} />
      <Route path="/privacy" element={<PublicRoute><PublicLayout><PrivacyPage /></PublicLayout></PublicRoute>} />
      <Route path="/terms" element={<PublicRoute><PublicLayout><TermsPage /></PublicLayout></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><PublicLayout><LoginPage /></PublicLayout></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><PublicLayout><SignupPage /></PublicLayout></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><PublicLayout><ForgotPasswordPage /></PublicLayout></PublicRoute>} />
      
      {/* App routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="low-stock" element={<LowStockPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="gst" element={<GstToolsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes; 