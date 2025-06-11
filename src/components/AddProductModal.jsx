import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '@/components/ui/select';

import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';


const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState('product'); // 'product' or 'service'
  const [vendors, setVendors] = useState([]);
  const [branches, setBranches] = useState([]);
  const { toast } = useToast();

  // Fetch vendors and branches on modal open
  useEffect(() => {
    if (isOpen) {
      const fetchVendorsAndBranches = async () => {
        try {
          // Fetch Vendors
          const vendorsResponse = await api.get('/vendors'); // Adjust endpoint as needed
          if (vendorsResponse.status !== 200) {
            throw new Error('Failed to fetch vendors');
          }
          setVendors(vendorsResponse.data);

          // Fetch Branches
          const branchesResponse = await api.get('/branches'); // Adjust endpoint as needed
          if (branchesResponse.status !== 200) {
            throw new Error('Failed to fetch branches');
          }
          setBranches(branchesResponse.data);

        } catch (error) {
          console.error('Error fetching vendors or branches:', error);
          toast({
            title: "Error",
            description: error.message || "Failed to load vendors or branches.",
            variant: "destructive",
          });
        }
      };
      fetchVendorsAndBranches();
    } else {
      // Reset form fields and data when closing
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setSku('');
      setCategory('');
      setUnit('');
      setVendorId('');
      setBranchId('');
      setItemType('product');
    }
  }, [isOpen, toast]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Remove redundant method: 'POST'
      const response = await api.post('/products', {
          name,
          description,
          price: parseFloat(price),
          quantity: itemType === 'product' ? parseInt(quantity, 10) : undefined, // Include quantity only for products
          sku: itemType === 'product' ? sku : undefined, // Include SKU only for products
          category,
          unit: itemType === 'product' ? unit : undefined, // Include unit only for products
          vendorId,
          branchId,
          type: itemType, // Add item type
      });
      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setItemType('product'); // Reset type
      setBranchId('');
      setSku('');
      setCategory('');
      setUnit('');
      setVendorId('');

      toast({ title: "Success", description: "Item added successfully." });
      onProductAdded(); // Call the function to refresh the list
      onClose();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {itemType === 'product' ? 'Product' : 'Service'}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            Type
          </Label>
          <RadioGroup defaultValue="product" onValueChange={setItemType} className="col-span-3 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="product" id="type-product" />
              <Label htmlFor="type-product">Product</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="service" id="type-service" />
              <Label htmlFor="type-service">Service</Label>
            </div>
          </RadioGroup>
        </div>
        <form onSubmit={handleAddProduct} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              required
              step="0.01"
            />
          </div>
          {itemType === 'product' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Initial Stock
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
                required
                min="0"
              />
            </div>
          )}
          {/* Add more fields as needed: description, quantity, etc. */}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;