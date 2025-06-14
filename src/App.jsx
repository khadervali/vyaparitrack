// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/app/DashboardPage';
import InventoryPage from '@/pages/app/InventoryPage';
import LowStockPage from '@/pages/app/LowStockPage';
import SalesPage from '@/pages/app/SalesPage';
import SalesOrdersPage from '@/pages/app/SalesOrdersPage';
import CustomersPage from '@/pages/app/CustomersPage';
import SettingsPage from '@/pages/app/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { VendorProvider } from '@/context/VendorContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <VendorProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* App routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="low-stock" element={<LowStockPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="sales-orders" element={<SalesOrdersPage />} />
            <Route path="purchases" element={<CustomersPage />} />
            <Route path="reports" element={<div>Reports Page</div>} />
            <Route path="vendors" element={<div>Vendors Page</div>} />
            <Route path="gst" element={<div>GST Tools Page</div>} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Redirect root to app */}
          <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </VendorProvider>
    </Router>
  );
}

export default App;
