import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle } from 'lucide-react';
import api from '@/lib/api';

const NewPurchaseOrderModal = ({ isOpen, onClose, onPurchaseOrderCreated, products }) => {
  const [formData, setFormData] = useState({
    supplier: '',
    date: '',
    items: [],
  });
  const [availableProducts, setAvailableProducts] = useState([]);
  const [newItem, setNewItem] = useState({ product: '', quantity: 0, unitPrice: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setAvailableProducts(products || []);
    }
  }, [isOpen, products]); // Update available products when the modal opens

  const handleCreatePurchaseOrder = async (e) => {
    e.preventDefault();

    if (!formData.supplier || !formData.date || formData.items.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields and add at least one item.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/purchaseorders', formData);;

        if (!response.ok) {
 throw new Error(response.statusText || 'Failed to create purchase order');
        }
      const result = await response.json();
      toast({ title: 'Success', description: 'Purchase Order created successfully.', variant: 'success' }); // Use success variant
      onPurchaseOrderCreated(); // Call the function to refresh the list
      onClose(); // Close the modal
    } catch (error) {
      toast({ title: 'Error', description: error.message || 'An unexpected error occurred while creating the purchase order.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (indexToEdit) => {
    setEditingItemIndex(indexToEdit);
    setNewItem(formData.items[indexToEdit]);
  };

  const handleAddItem = () => {
    if (!newItem.product || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
      toast({
        title: 'Error',
        description: 'Please select a product and enter valid quantity and unit price.', // Keep original message
        variant: 'destructive',
      });
      return;
    }
    // Logic for editing item would go here if needed
    setFormData({
      ...formData,
      items: [...formData.items, { ...newItem }],
    });
    setNewItem({ product: '', quantity: 0, unitPrice: 0 }); // Clear the input fields
  };

  const handleRemoveItem = (indexToRemove) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, index) => index !== indexToRemove),
    });
  };


  // Find the selected product object for display
  const getProductName = (productId) => availableProducts.find(p => p._id === productId)?.name || 'Unknown Product';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Purchase Order</DialogTitle>

        </DialogHeader>
        <form onSubmit={handleCreatePurchaseOrder} className="space-y-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <Label htmlFor="supplier">Supplier (Placeholder)</Label>
            <Input
              id="supplier"
              type="text"
              placeholder="Select Supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            />
            {/* Supplier selection component will go here */}
          </div>
           <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
           </div>

          <div>
            <Label>Purchase Order Items (Placeholder)</Label>
            <div className="border rounded-md p-4 space-y-4">
              {formData.items.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center">No items added to this purchase order yet.</p>
              ) : (
                <div className="space-y-2">
                  {formData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0 last:pb-0">
                    <div className="text-sm">
                      <p className="font-medium">{getProductName(item.product)}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity} | Unit Price: {item.unitPrice !== undefined && item.unitPrice !== null ? `₹${item.unitPrice.toFixed(2)}` : 'N/A'}</p>
                      <p className="font-semibold">Subtotal: ₹{(item.quantity * item.unitPrice).toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      {/* Placeholder for edit button */ }
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                  )
                
              )}
              </div> )} 
              {/* Closing the conditional rendering for existing items */}
                {/* New Item Input Section */}
              <div className="pt-4 border-t"> {/* This div was correctly placed */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                 <div className="sm:col-span-3">
                    <Label htmlFor="product">Product</Label>
                     <select
                      id="product"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newItem.product}
                      onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
                    >
                      <option value="">Select a product</option>
                      {availableProducts.map(product => (
                        <option key={product._id} value={product._id}>{product.name} ({product.type})</option>
                      ))}
                    </select>
                 </div>
                 <div>
                    <Label htmlFor="quantity">Quantity</Label>
                     <Input id="quantity" type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })} />
                 </div>
                  <div>
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Input id="unitPrice" type="number" value={newItem.unitPrice} onChange={(e) => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })} step="0.01" />
                  </div>
              </div>
               <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
              </Button>
               </div>
            </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Purchase Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPurchaseOrderModal;