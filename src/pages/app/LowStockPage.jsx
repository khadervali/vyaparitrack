import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import StockAdjustmentModal from '@/components/StockAdjustmentModal';

const LowStockPage = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toast } = useToast();

  const fetchLowStockProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory/low-stock');
      setLowStockProducts(response.data);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      toast({
        title: "Error",
        description: "Failed to load low stock products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setIsStockAdjustmentModalOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Low Stock Items</h1>
      </div>

      <Card className="card-glassmorphism">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Low Stock Alert</h2>
              <p className="text-muted-foreground">Items that need to be restocked soon</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => fetchLowStockProducts()}
              className="focus-ring"
            >
              Refresh
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading low stock items...</p>
            </div>
          ) : lowStockProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-foreground">
                <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20 backdrop-blur-sm">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-tl-md">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-right">Current Stock</th>
                    <th scope="col" className="px-6 py-3 text-right">Min Stock</th>
                    <th scope="col" className="px-6 py-3 text-center rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10 transition-colors">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-medium ${
                          product.quantity <= 0 ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">{product.minStockQuantity || 5}</td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary/80 focus-ring"
                          onClick={() => handleAdjustStock(product)}
                        >
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Adjust Stock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No Low Stock Items</h3>
              <p className="mt-1 text-muted-foreground">All your inventory levels are healthy.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <StockAdjustmentModal
        isOpen={isStockAdjustmentModalOpen}
        onClose={() => setIsStockAdjustmentModalOpen(false)}
        onStockAdjusted={fetchLowStockProducts}
        products={selectedProduct ? [selectedProduct] : lowStockProducts}
      />
    </motion.div>
  );
};

export default LowStockPage;