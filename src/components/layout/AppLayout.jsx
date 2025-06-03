import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  LayoutDashboard, Package, IndianRupee, ShoppingCart, BarChart3, FileText, Settings, UserCircle, LogOut, Menu, X, Sun, Moon, Bell, ChevronDown, ShoppingBag
} from 'lucide-react';

const SidebarLink = ({ to, icon, text, currentPath, setIsMobileMenuOpen }) => {
  const isActive = currentPath === to || (currentPath.startsWith(to) && to !== "/app/dashboard" && to !== "/app");
  return (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
        ${isActive 
          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' 
          : 'text-foreground/70 hover:bg-accent hover:text-foreground dark:hover:bg-accent/10 dark:hover:text-foreground/90'
        }`}
    >
      {React.cloneElement(icon, { className: `w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-primary' : ''}` })}
      <span className="truncate">{text}</span>
    </Link>
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background dark:from-background dark:via-primary/5 dark:to-background">
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
          className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-card/80 dark:bg-card/40 border-r backdrop-blur-md transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex-shrink-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="sticky top-0 h-16 flex items-center px-4 border-b bg-card/60 dark:bg-card/40 backdrop-blur-md z-20">
            <Link to="/app/dashboard" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">VyapariTrack</span>
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
          <header className="sticky top-0 h-16 flex items-center justify-between px-4 border-b bg-card/60 dark:bg-card/40 backdrop-blur-md z-20">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md lg:hidden hover:bg-accent"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
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
          <main className="flex-1 overflow-auto p-6 bg-background/50 dark:bg-background/40">
            <div className="container mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;