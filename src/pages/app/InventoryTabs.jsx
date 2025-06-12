import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Tag, ArrowUpDown, Boxes, AlertCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StockAdjustmentModal from '@/components/StockAdjustmentModal';

const InventoryTabs = ({ products, inventoryStats, fetchProducts }) => {
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { id: 'categories', label: 'Categories', icon: <Tag className="h-4 w-4" /> },
    { id: 'stock-adjustment', label: 'Adjust Stock', icon: <ArrowUpDown className="h-4 w-4" /> },
    { id: 'stock-transfer', label: 'Transfer', icon: <Boxes className="h-4 w-4" /> },
    { id: 'low-stock', label: 'Low Stock', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-4 w-4" /> }
  ];

  // Toggle visibility of products content and add button based on active tab
  useEffect(() => {
    const productsContent = document.getElementById('products-content');
    const addProductButton = document.getElementById('add-product-button');
    
    if (productsContent) {
      productsContent.style.display = activeTab === 'products' ? 'block' : 'none';
    }
    
    if (addProductButton) {
      addProductButton.style.display = activeTab === 'products' ? 'block' : 'none';
    }
    
    // Prevent unnecessary API calls when switching tabs
    if (activeTab === 'products') {
      // Only fetch products when switching to products tab
      // fetchProducts is already called on component mount
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    if (tabId === 'stock-adjustment') {
      setIsStockAdjustmentModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`mr-2 flex items-center ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'products' ? (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Products tab content is rendered in parent component */}
          </motion.div>
        ) : activeTab === 'categories' ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="card-glassmorphism p-4">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold mb-4">Product Categories</h2>
                <p>Categories functionality will be loaded here.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('products')}
                >
                  Back to Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : activeTab === 'stock-transfer' ? (
          <motion.div
            key="stock-transfer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="card-glassmorphism p-4">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold mb-4">Stock Transfer</h2>
                <p>Stock transfer functionality will be loaded here.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('products')}
                >
                  Back to Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : activeTab === 'low-stock' ? (
          <motion.div
            key="low-stock"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="card-glassmorphism p-4">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold mb-4">Low Stock Items</h2>
                <p>Low stock items will be displayed here.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('products')}
                >
                  Back to Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : activeTab === 'reports' ? (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="card-glassmorphism p-4">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold mb-4">Inventory Reports</h2>
                <p>Reports functionality will be implemented soon.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('products')}
                >
                  Back to Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <StockAdjustmentModal
        isOpen={isStockAdjustmentModalOpen}
        onClose={() => setIsStockAdjustmentModalOpen(false)}
        onStockAdjusted={fetchProducts}
        products={products}
      />

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default InventoryTabs;