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
    const user = JSON.parse(localStorage.getItem('vyaparitrack_currentUser'));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

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
    localStorage.removeItem('vyaparitrack_currentUser');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate('/');
  };

  const navLinks = [
    { to: '/app/dashboard', icon: <LayoutDashboard />, text: 'Dashboard' },
    { to: '/app/inventory', icon: <Package />, text: 'Inventory' },
    { to: '/app/sales', icon: <IndianRupee />, text: 'Sales' },
    { to: '/app/purchases', icon: <ShoppingCart />, text: 'Purchases' },
    { to: '/app/reports', icon: <BarChart3 />, text: 'Reports' },
    { to: '/app/gst-tools', icon: <FileText />, text: 'GST Tools' },
    { to: '/app/settings', icon: <Settings />, text: 'Settings' },
  ];

  if (!currentUser) return <div className="flex items-center justify-center min-h-screen bg-background text-foreground">Authenticating...</div>;

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };
  
  const topbarHeightClass = "h-16"; // Tailwind class for height

  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 bg-card dark:bg-card/80 border-r border-border/70 fixed top-0 left-0 bottom-0 z-30 ${topbarHeightClass} pt-16`}>
        <div className="flex-grow p-4 space-y-2">
          {navLinks.map(link => (
            <SidebarLink key={link.to} {...link} currentPath={location.pathname} />
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            />
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`md:hidden fixed top-0 left-0 bottom-0 w-64 bg-card dark:bg-card/95 z-40 flex flex-col ${topbarHeightClass} pt-16`}
            >
              <div className="flex-grow p-4 space-y-2 overflow-y-auto">
                {navLinks.map(link => (
                  <SidebarLink key={link.to} {...link} currentPath={location.pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col md:ml-64`}>
        {/* Topbar */}
        <header className={`${topbarHeightClass} bg-card dark:bg-card/80 border-b border-border/70 flex items-center justify-between px-4 sm:px-6 z-20 sticky top-0`}>
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden mr-3 p-2 text-foreground/80 hover:text-primary">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
             <Link to="/app/dashboard" className="flex items-center space-x-2 md:hidden">
                <ShoppingBag className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 dark:to-blue-300">
                    VyapariTrack
                </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-foreground/70" />}
            </motion.button>

            <button className="p-2 rounded-full hover:bg-accent relative">
              <Bell size={20} className="text-foreground/70" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-accent"
              >
                <UserCircle size={28} className="text-foreground/70" />
                <span className="hidden sm:inline text-sm font-medium text-foreground/80">{currentUser.fullName.split(' ')[0]}</span>
                <ChevronDown size={16} className="text-foreground/60" />
              </button>
              <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg py-1 z-50"
                >
                  <Link to="/app/profile" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent">My Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-popover-foreground hover:bg-accent">
                    <LogOut className="inline w-4 h-4 mr-2" />Logout
                  </button>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-secondary/30 dark:bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;