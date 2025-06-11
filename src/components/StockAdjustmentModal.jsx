import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';import api from '@/lib/api';


const StockAdjustmentModal = ({ isOpen, onClose, onStockAdjusted, products }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('stock-in'); // 'stock-in' or 'stock-out'
  const [quantity, setQuantity] = useState('');
  const [productList, setProductList] = useState([]);
  const [branches, setBranches] = useState([]); // State to store fetched branches
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setProductList(products || []);
    }
  }, [isOpen, products]);

  // Removed fetchProducts and related code

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        // Replace with your actual API endpoint for fetching branches
        const response = await api.get('/api/branches');
        if (!response.ok) {
          throw new Error('Failed to fetch branches');
        }
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error('Error fetching branches:', error);
         toast({
          title: "Error",
          description: "Failed to load branches for adjustment.",
          variant: "destructive",
        });
      }
    };

    if (isOpen) {
      fetchBranches();
    }
  }, [isOpen, toast]); // Fetch data when the modal opens or toast changes

  const handleSubmit = async () => {
    if (!selectedProduct || !selectedBranch || !adjustmentType || quantity <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields and provide a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    const endpoint = adjustmentType === 'stock-in' ? '/api/inventory/stock-in' : '/api/inventory/stock-out';

    try {
      const response = await api.post(endpoint, {
 productId: selectedProduct, branchId: selectedBranch,
          quantity: parseInt(quantity, 10), // Ensure quantity is a number
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Stock adjustment failed');
      }

      toast({
        title: "Success",
        description: `Stock adjustment (${adjustmentType}) successful.`,
      });
      onClose(); // Close modal on success
      onStockAdjusted(); // Refresh the inventory list
    } catch (error) {
      console.error('Error submitting stock adjustment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit stock adjustment.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stock Adjustment</DialogTitle>
          <DialogDescription>
            Adjust the stock quantity for a product in a specific branch.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
             <Select onValueChange={setSelectedProduct} value={selectedProduct}>
              <SelectTrigger className="col-span-3" id="product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {productList.map((product) => (
                  <SelectItem key={product._id} value={product._id}>{product.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branch" className="text-right">
              Branch
            </Label>
            <Select onValueChange={setSelectedBranch} value={selectedBranch}>
              <SelectTrigger className="col-span-3" id="branch">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                 {branches.map((branch) => (
                  <SelectItem key={branch._id} value={branch._id}>{branch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={setAdjustmentType} value={adjustmentType}>
              <SelectTrigger className="col-span-3" id="type">
                <SelectValue placeholder="Select adjustment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock-in">Stock In</SelectItem>
                <SelectItem value="stock-out">Stock Out</SelectItem>
              </SelectContent>
            </Select>
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
            />
          </div>
        </div>
        <Button type="submit" onClick={handleSubmit}>Submit Adjustment</Button>
      </DialogContent>
    </Dialog>
  );
};

export default StockAdjustmentModal;
