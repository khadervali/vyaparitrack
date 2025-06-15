import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/ui/data-table';
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
        const quantity = product.stockQuantity || product.quantity || 0;
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
      <DataTable
        data={lowStockProducts}
        columns={[
          {
            key: 'name',
            header: 'Product Name',
            render: (row) => <span className="font-medium whitespace-nowrap">{row.name}</span>
          },
          {
            key: 'stockQuantity',
            header: 'Current Stock',
            className: 'text-right',
            render: (row) => (
              <span className={`font-medium ${
                (row.stockQuantity || row.quantity) <= 0 ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {row.stockQuantity || row.quantity || 0}
              </span>
            )
          },
          {
            key: 'minStockQuantity',
            header: 'Min Stock',
            className: 'text-right',
            render: (row) => row.minStockQuantity || 5
          },
          {
            key: 'actions',
            header: 'Actions',
            className: 'text-center',
            render: (row) => (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary hover:text-primary/80 focus-ring"
                onClick={() => handleAdjustStock(row)}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Adjust Stock
              </Button>
            )
          }
        ]}
        searchable={true}
        sortable={true}
        pagination={true}
        pageSize={10}
        loading={loading}
        emptyMessage="No low stock items found"
      />

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