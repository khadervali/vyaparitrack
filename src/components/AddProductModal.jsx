import React, { useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { useVendor } from '@/context/VendorContext';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState('product'); // 'product' or 'service'
  const { toast } = useToast();
  const { currentVendor } = useVendor();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/products', {
        name,
        description,
        price: parseFloat(price),
        quantity: itemType === 'product' ? parseInt(quantity, 10) : 0,
        sku: itemType === 'product' ? sku : '',
        category,
        type: itemType,
        vendor_id: currentVendor?.id || 1
      });
      
      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setSku('');
      setCategory('');
      setItemType('product');

      toast({ title: "Success", description: "Item added successfully." });
      onProductAdded(); // Call the function to refresh the list
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to add product", 
        variant: "destructive" 
      });
    } finally {
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
          <RadioGroup defaultValue="product" value={itemType} onValueChange={setItemType} className="col-span-3 flex items-center gap-4">
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
            <>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input
                  id="sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3"
            />
          </div>
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