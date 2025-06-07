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
import { apiUrl } from '@/lib/api';

const EditProductModal = ({ isOpen, onClose, productToEdit, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    // Quantity and branchId are managed via Inventory,
    // but we might need branchId for certain updates if the API requires it.
    // quantity: '',
    // branchId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (productToEdit && isOpen) { // Only update when modal is open and productToEdit changes
      setFormData({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        quantity: productToEdit.quantity || '',
        branchId: productToEdit.branchId || '', // Assuming branchId is part of product or inventory data
      });
    } else if (!isOpen) { // Reset form when modal closes
       setFormData({
        name: '',
        description: '',
        price: 0,
        // quantity: '',
        // branchId: '',
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Construct the data to send based on item type
      const dataToSend = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price), // Ensure price is a number
        // We are not updating quantity or branchId directly via product update
      };
      
      const response = await fetch(apiUrl(`api/products/${productToEdit._id}`), {
        method: 'PUT', // or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      toast({
        title: 'Product Updated',
        description: `${updatedProduct.name} has been updated successfully.`,
      });
      onProductUpdated(); // Refresh list
      onClose(); // Close modal
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
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
          {productToEdit?.type === 'product' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input id="quantity" type="number" value={formData.quantity} onChange={handleChange} className="col-span-3" required />
            </div>
          )}
          {/* Add Branch selection if needed for editing stock in a specific branch 
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchId" className="text-right">
              Branch
            </Label>
            <Input id="branchId" value={formData.branchId} onChange={handleChange} className="col-span-3" required />
          </div>
          */}
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