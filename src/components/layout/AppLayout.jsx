import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  LayoutDashboard, Package, IndianRupee, ShoppingCart, BarChart3, FileText, 
  Settings, UserCircle, LogOut, Menu, X, Sun, Moon, Bell, ChevronDown, 
  ShoppingBag, Sparkles
} from 'lucide-react';

const SidebarLink = ({ to, icon, text, currentPath, setIsMobileMenuOpen }) => {
  const isActive = currentPath === to || (currentPath.startsWith(to) && to !== "/app/dashboard" && to !== "/app");
  return (
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={to}
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary backdrop-blur-sm shadow-sm' 
            : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground dark:hover:bg-accent/20 dark:hover:text-foreground/90'
          }`}
      >
        <div className="relative">
          {React.cloneElement(icon, { className: `w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-primary' : ''}` })}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)',
                transform: 'scale(1.6)'
              }}
            />
          )}
        </div>
        <span className="truncate">{text}</span>
        {isActive && (
          <motion.div
            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('vyaparitrack-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userRole = localStorage.getItem('userRole');
      
      if (!token || !isAuthenticated) {
        navigate('/login');
        return;
      }

      // Set current user from token
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({
          role: userRole,
          ...tokenPayload.user
        });
      } catch (error) {
        console.error('Error parsing token:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, location.pathname]); // Re-check auth on route change

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vyaparitrack-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vyaparitrack-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate('/login');
  };

  const navLinks = [
    { to: '/app/dashboard', icon: <LayoutDashboard />, text: 'Dashboard' },
    { to: '/app/inventory', icon: <Package />, text: 'Inventory' },
    { to: '/app/sales', icon: <IndianRupee />, text: 'Sales' },
    { to: '/app/purchases', icon: <ShoppingCart />, text: 'Purchases' },
    { to: '/app/reports', icon: <BarChart3 />, text: 'Reports' },
    { to: '/app/gst', icon: <FileText />, text: 'GST Tools' },
    { to: '/app/settings', icon: <Settings />, text: 'Settings' },
  ];

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh">
      <div className="flex h-full">
        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 z-50 h-full w-64 sidebar-glassmorphism transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex-shrink-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="sticky top-0 h-16 flex items-center px-4 border-b border-border/30 navbar-glassmorphism z-20">
            <Link to="/app/dashboard" className="flex items-center space-x-2">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <motion.div 
                  className="absolute -top-1 -right-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                </motion.div>
              </div>
              <span className="font-bold text-lg gradient-text">VyapariTrack</span>
            </Link>
          </div>
          <nav className="p-4 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <SidebarLink
                key={link.to}
                {...link}
                currentPath={location.pathname}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}
          </nav>
        </aside>

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top navigation bar */}
          <header className="sticky top-0 h-16 flex items-center justify-between px-4 border-b border-border/30 navbar-glassmorphism z-20">
            <div className="flex items-center">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md lg:hidden hover:bg-accent/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={darkMode ? "Switch to light theme" : "Switch to dark mode"}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  key={darkMode ? "sun" : "moon"}
                  className="relative z-10"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground/70" />
                  )}
                </motion.div>
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: darkMode ? 0.15 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    background: 'radial-gradient(circle, rgba(250,204,21,0.7) 0%, rgba(250,204,21,0) 70%)'
                  }}
                />
              </motion.button>
              
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{currentUser?.username}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-1 bg-card border rounded-md shadow-lg">
                    <Link
                      to="/app/profile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/app/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-accent text-red-500"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="container mx-auto max-w-7xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;