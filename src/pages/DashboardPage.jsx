import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, IndianRupee, Users, Settings, AlertTriangle, Bell } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


const StatCard = ({ title, value, icon, description, color }) => (
  <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${color} hover:scale-[1.02] glassmorphism`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-foreground/90">{title}</CardTitle>
      {React.cloneElement(icon, { className: `h-5 w-5 ${color.includes('green') ? 'text-green-500' : 
        color.includes('blue') ? 'text-blue-500' : 
        color.includes('purple') ? 'text-purple-500' : 
        'text-yellow-500'} dark:opacity-90` })}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground pt-1">{description}</p>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!token || !isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser({
        ...tokenPayload.user,
        role: localStorage.getItem('userRole')
      });
    } catch (error) {
      console.error('Error parsing token:', error);
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { title: "Total Sales", value: "₹1,25,430", icon: <IndianRupee />, description: "+20.1% from last month", color: "bg-green-500/10 dark:bg-green-500/20" },
    { title: "Active Products", value: "235", icon: <Package />, description: "+10 since last week", color: "bg-blue-500/10 dark:bg-blue-500/20" },
    { title: "Total Customers", value: "89", icon: <Users />, description: "+5 new this month", color: "bg-purple-500/10 dark:bg-purple-500/20" },
    { title: "Pending Orders", value: "12", icon: <BarChart3 />, description: "Needs attention", color: "bg-yellow-500/10 dark:bg-yellow-500/20" },
  ];

  const quickActions = [
    { label: "Add New Product", path: "/app/inventory", icon: <Package className="mr-2 h-4 w-4"/> },
    { label: "Create Invoice", path: "/app/sales", icon: <IndianRupee className="mr-2 h-4 w-4"/> },
    { label: "Manage Staff", path: "/app/settings", icon: <Users className="mr-2 h-4 w-4"/> },
    { label: "Account Settings", path: "/app/profile", icon: <Settings className="mr-2 h-4 w-4"/> },
  ];

  const alerts = [
    { id: 1, type: "Low Stock", message: "Product 'ABC' - 5 units remaining.", severity: "warning", icon: <AlertTriangle className="text-yellow-500" /> },
    { id: 2, type: "Expiry Reminder", message: "Batch 'XYZ123' for Product 'PQR' expires in 7 days.", severity: "info", icon: <Bell className="text-blue-500" /> },
    { id: 3, type: "Overdue Invoice", message: "Invoice #INV00120 for Customer 'Delta' is overdue by 3 days.", severity: "error", icon: <IndianRupee className="text-red-500" /> },
  ];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Order content will go here */}
            <p className="text-sm text-muted-foreground">No recent orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>Items that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Low stock items will go here */}
            <p className="text-sm text-muted-foreground">No items below threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Sales chart will go here */}
            <p className="text-sm text-muted-foreground">No sales data available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;