import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import StockAdjustmentModal from './StockAdjustmentModal';

const LowStockItems = ({ products, onStockAdjusted }) => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Filter products with low stock from the provided products
    const filterLowStockProducts = () => {
      if (!products || products.length === 0) {
        setLowStockProducts([]);
        setLoading(false);
        return;
      }

      const filtered = products.filter(product => {
        if (product.type === 'service') return false;
        const quantity = product.quantity || 0;
        const minQuantity = product.minStockQuantity || 5; // Default min stock is 5
        return quantity <= minQuantity;
      });

      setLowStockProducts(filtered);
      setLoading(false);
    };

    filterLowStockProducts();
  }, [products]);

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setIsStockAdjustmentModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading low stock items...</p>
      </div>
    );
  }

  if (lowStockProducts.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No Low Stock Items</h3>
        <p className="mt-1 text-muted-foreground">All your inventory levels are healthy.</p>
      </div>
    );
  }

  return (
    <>
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

      <StockAdjustmentModal
        isOpen={isStockAdjustmentModalOpen}
        onClose={() => setIsStockAdjustmentModalOpen(false)}
        onStockAdjusted={onStockAdjusted}
        products={selectedProduct ? [selectedProduct] : lowStockProducts}
      />
    </>
  );
};

export default LowStockItems;