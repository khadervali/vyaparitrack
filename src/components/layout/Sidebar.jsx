import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVendor } from '@/context/VendorContext';

const Sidebar = ({ isMobile, setIsMobileMenuOpen }) => {
  const { currentVendor } = useVendor();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/dashboard',
    },
    {
      title: 'Inventory',
      icon: <Package className="h-5 w-5" />,
      path: '/inventory',
    },
    {
      title: 'Low Stock',
      icon: <AlertCircle className="h-5 w-5" />,
      path: '/low-stock',
      badge: 'New'
    },
    {
      title: 'Sales',
      icon: <ShoppingCart className="h-5 w-5" />,
      path: '/sales',
    },
    {
      title: 'Purchases',
      icon: <Package className="h-5 w-5" />,
      path: '/purchases',
    },
    {
      title: 'Reports',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/reports',
    },
    {
      title: 'GST Tools',
      icon: <Package className="h-5 w-5" />,
      path: '/gst',
    },
    {
      title: 'Customers',
      icon: <Users className="h-5 w-5" />,
      path: '/customers',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings',
    },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <div className="mb-4 px-4 py-3.5">
          <div className="text-lg font-semibold text-foreground">
            VyapariTrack
          </div>
          {currentVendor && (
            <div className="text-sm text-muted-foreground mt-1 truncate">
              {currentVendor.name}
            </div>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-1 px-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start">
          <span className="sr-only">Help</span>
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            Help & Support
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;