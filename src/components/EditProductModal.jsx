import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

const EditProductModal = ({ isOpen, onClose, productToEdit, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    sku: '',
    category: '',
    type: 'product',
    stockQuantity: 0,
    minStockQuantity: 10,
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);
  
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to sample categories if API fails
      setCategories([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Groceries' }
      ]);
    }
  };

  useEffect(() => {
    if (productToEdit && isOpen) {
      setFormData({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        sku: productToEdit.sku || '',
        quantity: productToEdit.stockQuantity || productToEdit.quantity || 0,
        minStockQuantity: productToEdit.minStockQuantity || 10,
        category: productToEdit.category?.name || productToEdit.category || '',
        type: productToEdit.type || 'product',
      });
    } else if (!isOpen) {
      setFormData({
        name: '',
        description: '',
        price: 0,
        sku: '',
        category: '',
        type: 'product',
        stockQuantity: 0,
        minStockQuantity: 10,
      });
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Find the selected category object
      const selectedCategory = categories.find(cat => cat.name === formData.category);
      
      const dataToSend = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price), // Ensure price is a number
        stockQuantity: parseInt(formData.quantity, 10),
        minStockQuantity: parseInt(formData.minStockQuantity || 10, 10),
        category_id: selectedCategory ? selectedCategory.id : null,
        type: 'product'
      };
      
      console.log('Updating product with data:', dataToSend); // Debug log
      
      const response = await api.put(`/products/${productToEdit.id}`, dataToSend);
      
      // Handle successful response from axios
      const updatedProduct = response.data;
      toast({
        title: 'Product Updated',
        description: `${updatedProduct.name} has been updated successfully.`,
      });
      onProductUpdated(); // Refresh list
      onClose(); // Close modal
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateProduct} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sku" className="text-right">
              SKU
            </Label>
            <Input id="sku" value={formData.sku} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" required />
          </div>
          {formData.type === 'product' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Stock Quantity
                </Label>
                <Input id="quantity" type="number" value={formData.quantity} onChange={handleChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStockQuantity" className="text-right">
                  Min Stock Level
                </Label>
                <Input id="minStockQuantity" type="number" value={formData.minStockQuantity} onChange={handleChange} className="col-span-3" required />
              </div>
            </>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;