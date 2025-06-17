import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  ShoppingCart,
  ShoppingBag,
  BarChart3,
  Users,
  Settings,
  User,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', href: '/app/inventory', icon: Package },
    { name: 'Low Stock', href: '/app/low-stock', icon: AlertTriangle },
    { name: 'Sales', href: '/app/sales', icon: ShoppingCart },
    { name: 'Purchases', href: '/app/purchases', icon: ShoppingBag },
    { name: 'Customers', href: '/app/customers', icon: Users },
    { name: 'Reports', href: '/app/reports', icon: BarChart3 },
    { name: 'GST Reports', href: '/app/gst', icon: BarChart3 },
  ];

  return (
    <div className="flex h-full w-full md:w-64 flex-col border-r bg-background">
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ShoppingBag className="h-8 w-8 text-primary" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </motion.div>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            VyapariTrack
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2 md:py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          }
        >
          <User className="h-4 w-4" />
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;