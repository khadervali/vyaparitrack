import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, IndianRupee, Users, Settings, AlertTriangle, Bell } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


const StatCard = ({ title, value, icon, description, color }) => (
  <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${color} dark:bg-opacity-20 glassmorphism`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-foreground/90">{title}</CardTitle>
      {React.cloneElement(icon, { className: "h-5 w-5 text-muted-foreground" })}
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
    const user = JSON.parse(localStorage.getItem('vyaparitrack_currentUser'));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate('/login'); 
    }
  }, [navigate]);


  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-lg text-muted-foreground">Loading user data...</p>
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
    <div className="min-h-full">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Welcome back, <span className="text-primary">{currentUser.fullName}!</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your business today.</p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg glassmorphism h-full">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
              <CardDescription className="text-muted-foreground">Get started with common tasks.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Button 
                  key={action.label} 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3 hover:bg-accent dark:hover:bg-accent/50"
                  asChild
                >
                  <Link to={action.path}>
                    {action.icon}
                    {action.label}
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-lg glassmorphism h-full">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Alerts & Notifications</CardTitle>
              <CardDescription className="text-muted-foreground">Important updates and reminders.</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {alerts.map((alert) => (
                    <li key={alert.id} className={`flex items-start p-3 rounded-md text-sm ${
                      alert.severity === 'warning' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                      alert.severity === 'info' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                      'bg-red-500/10 text-red-700 dark:text-red-400'
                    }`}>
                      <span className="mr-2 mt-0.5">{alert.icon}</span>
                      <span>{alert.message}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No new alerts.</p>
              )}
            </CardContent>
          </Card>
        </motion.section>
      </div>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="shadow-lg glassmorphism">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Recent Activity (Placeholder)</CardTitle>
             <CardDescription className="text-muted-foreground">This section will show recent sales, stock updates, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-sm text-foreground/80 p-3 bg-secondary/30 dark:bg-secondary/20 rounded-md">New sale: Order #INV00123 - ₹2,500</li>
              <li className="text-sm text-foreground/80 p-3 bg-secondary/30 dark:bg-secondary/20 rounded-md">Stock updated: Product 'XYZ' - 10 units added</li>
            </ul>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default DashboardPage;