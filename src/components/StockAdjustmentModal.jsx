import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

const StockAdjustmentModal = ({ isOpen, onClose, onStockAdjusted, products }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('stock-in');
  const [quantity, setQuantity] = useState('');
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setProductList(products?.filter(p => p.type !== 'service') || []);
      setSelectedProduct('');
      setAdjustmentType('stock-in');
      setQuantity('');
    }
  }, [isOpen, products]);

  const handleSubmit = async () => {
    if (!selectedProduct || !adjustmentType || quantity <= 0) {
      toast({
        title: "Error",
        description: "Please select a product and provide a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the API to adjust stock
      const response = await api.post('/inventory/adjust-stock', {
        productId: selectedProduct,
        quantity: parseInt(quantity),
        stockQuantity: parseInt(quantity), // Add stockQuantity field
        adjustmentType
      });
      
      toast({
        title: "Success",
        description: `Stock ${adjustmentType === 'stock-in' ? 'increased' : 'decreased'} by ${quantity} units.`,
      });
      
      // Close modal and refresh products
      onClose();
      onStockAdjusted();
    } catch (error) {
      console.error('Error adjusting stock:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to adjust stock.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
            <select 
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="">Select a product</option>
              {productList.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select 
              id="type"
              value={adjustmentType}
              onChange={(e) => setAdjustmentType(e.target.value)}
              className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="stock-in">Stock In</option>
              <option value="stock-out">Stock Out</option>
            </select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="col-span-3"
              min="1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Adjust Stock'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockAdjustmentModal;