import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Menu, Sun, Moon, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import SimpleVendorSelector from '../SimpleVendorSelector';

const AppHeader = ({ 
  toggleMobileMenu, 
  darkMode, 
  toggleTheme, 
  currentUser 
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedVendorId');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate('/login');
  };

  const handleVendorChange = (vendor) => {
    setSelectedVendor(vendor);
    // You can add additional logic here when vendor changes
    toast({ 
      title: "Vendor Changed", 
      description: `Now viewing ${vendor.name}` 
    });
  };

  return (
    <header className="sticky top-0 h-16 flex items-center justify-between px-4 border-b border-border/30 navbar-glassmorphism z-20">
      <div className="flex items-center">
        <motion.button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md lg:hidden hover:bg-accent/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="h-5 w-5" />
        </motion.button>
        
        {/* Vendor Selector */}
        <div className="ml-4">
          <SimpleVendorSelector onVendorChange={handleVendorChange} />
        </div>
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
  );
};

export default AppHeader;