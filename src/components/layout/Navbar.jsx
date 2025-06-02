import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingBag, Sun, Moon, LogOut, LayoutDashboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('vyaparitrack-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('vyaparitrack_currentUser'));
    setCurrentUser(user);
  }, [location.pathname]); // Re-check user on route change

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vyaparitrack-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vyaparitrack-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('vyaparitrack_currentUser');
    setCurrentUser(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAnchorLink = (path) => path.includes('/#');

  return (
    <nav className="sticky top-0 z-50 py-3 shadow-md glassmorphism">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 dark:to-blue-300">
            VyapariTrack
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isAnchorLink(item.path) ? (
                <a
                  href={item.path}
                  className={`text-foreground/80 hover:text-primary transition-colors duration-300 font-medium ${
                    location.pathname + location.hash === item.path ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={`text-foreground/80 hover:text-primary transition-colors duration-300 font-medium ${
                    location.pathname === item.path ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {currentUser ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-primary-foreground">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-foreground/70" />}
          </motion.button>
        </div>

        <div className="md:hidden flex items-center">
          <motion.button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-foreground/70" />}
          </motion.button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground focus:outline-none" aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden absolute top-full left-0 right-0 shadow-xl pb-4 glassmorphism border-t border-border/20 overflow-hidden`}
      >
        <div className="flex flex-col items-center space-y-4 pt-4">
          {navItems.map((item) => (
             <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full text-center">
              {isAnchorLink(item.path) ? (
                <a
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-foreground/90 hover:text-primary transition-colors duration-300 font-medium text-lg ${
                    location.pathname + location.hash === item.path ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-foreground/90 hover:text-primary transition-colors duration-300 font-medium text-lg ${
                     location.pathname === item.path ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
          {currentUser ? (
            <>
              <Button variant="ghost" className="w-3/4" asChild>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-3/4" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-3/4" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button className="w-3/4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-primary-foreground">
                <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;