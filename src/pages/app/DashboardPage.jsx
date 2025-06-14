import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import InventoryInsights from '@/components/dashboard/InventoryInsights';
import api from '@/lib/api';

const DashboardPage = () => {
  const [summaryData, setSummaryData] = useState({
    revenue: { value: 0, change: 0 },
    sales: { value: 0, change: 0 },
    customers: { value: 0, change: 0 },
    inventory: { value: 0, change: 0 },
    loading: true
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await api.get('/api/analytics/summary');
        setSummaryData({
          ...response.data,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch summary data:', error);
        // Mock data for development
        setSummaryData({
          revenue: { value: 45231.89, change: 20.1 },
          sales: { value: 12234, change: 19 },
          customers: { value: 573, change: 201 },
          inventory: { value: 12234.89, change: 2.5 },
          loading: false
        });
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summaryData.revenue.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">
              {summaryData.revenue.change > 0 ? '+' : ''}{summaryData.revenue.change}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{summaryData.sales.value.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
              {summaryData.sales.change > 0 ? '+' : ''}{summaryData.sales.change}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{summaryData.customers.value}</div>
            <p className="text-xs text-muted-foreground">
              {summaryData.customers.change > 0 ? '+' : ''}{summaryData.customers.change} since last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summaryData.inventory.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">
              {summaryData.inventory.change > 0 ? '+' : ''}{summaryData.inventory.change}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
      
      {/* Inventory Insights */}
      <InventoryInsights />
      
      {/* Recent Activity */}
      <Card className="card-glassmorphism">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New sale recorded</p>
                  <p className="text-xs text-muted-foreground">
                    {i * 10} minutes ago
                  </p>
                </div>
                <div className="text-sm font-medium">₹{i * 100 + 99}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;