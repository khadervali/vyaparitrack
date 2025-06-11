import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/lib/api';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    type: 'product', // 'product' or 'service'
    category: '',
    purchasePrice: '',
    salePrice: '',
    taxRate: '18', // Default GST rate
    hsnSac: '',
    barcode: '',
    unitOfMeasurement: 'Pcs',
    minStockQuantity: '10',
    initialStock: '0',
    isActive: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { toast } = useToast();

  // Load existing product data if editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        description: product.description || '',
        type: product.type || 'product',
        category: product.category || '',
        purchasePrice: product.purchasePrice?.toString() || '',
        salePrice: product.salePrice?.toString() || '',
        taxRate: product.taxRate?.toString() || '18',
        hsnSac: product.hsnSac || '',
        barcode: product.barcode || '',
        unitOfMeasurement: product.unitOfMeasurement || 'Pcs',
        minStockQuantity: product.minStockQuantity?.toString() || '10',
        initialStock: '0', // Don't set initial stock when editing
        isActive: product.isActive !== false
      });
    }
  }, [product]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Use default categories if API fails
        setCategories(['General', 'Electronics', 'Clothing', 'Food', 'Stationery']);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.sku) {
        toast({
          title: "Validation Error",
          description: "Product name and SKU are required.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Convert string values to numbers
      const dataToSubmit = {
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice) || 0,
        salePrice: parseFloat(formData.salePrice) || 0,
        taxRate: parseFloat(formData.taxRate) || 0,
        minStockQuantity: parseInt(formData.minStockQuantity) || 10,
        initialStock: parseInt(formData.initialStock) || 0
      };

      // Call the parent's onSave function
      await onSave(dataToSubmit);
      
      toast({
        title: product ? "Product Updated" : "Product Created",
        description: `${formData.name} has been ${product ? 'updated' : 'created'} successfully.`,
      });
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save product.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Tax</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name*</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sku">SKU (Stock Keeping Unit)*</Label>
              <Input 
                id="sku" 
                name="sku" 
                value={formData.sku} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={typeof category === 'string' ? category : category.name}>
                    {typeof category === 'string' ? category : category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode (Optional)</Label>
              <Input 
                id="barcode" 
                name="barcode" 
                value={formData.barcode} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2 flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
        </TabsContent>
        
        {/* Pricing & Tax Tab */}
        <TabsContent value="pricing" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Input 
                id="purchasePrice" 
                name="purchasePrice" 
                type="number" 
                step="0.01" 
                value={formData.purchasePrice} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input 
                id="salePrice" 
                name="salePrice" 
                type="number" 
                step="0.01" 
                value={formData.salePrice} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">GST Rate (%)</Label>
              <select
                id="taxRate"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="0">0% - Exempt</option>
                <option value="5">5% - GST</option>
                <option value="12">12% - GST</option>
                <option value="18">18% - GST</option>
                <option value="28">28% - GST</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hsnSac">HSN/SAC Code</Label>
              <Input 
                id="hsnSac" 
                name="hsnSac" 
                value={formData.hsnSac} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitOfMeasurement">Unit of Measurement</Label>
              <select
                id="unitOfMeasurement"
                name="unitOfMeasurement"
                value={formData.unitOfMeasurement}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="Pcs">Pieces (Pcs)</option>
                <option value="Kg">Kilograms (Kg)</option>
                <option value="g">Grams (g)</option>
                <option value="L">Liters (L)</option>
                <option value="mL">Milliliters (mL)</option>
                <option value="m">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="Box">Box</option>
                <option value="Dozen">Dozen</option>
                <option value="Pair">Pair</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minStockQuantity">Minimum Stock Level</Label>
              <Input 
                id="minStockQuantity" 
                name="minStockQuantity" 
                type="number" 
                value={formData.minStockQuantity} 
                onChange={handleChange} 
              />
            </div>
            
            {!product && (
              <div className="space-y-2">
                <Label htmlFor="initialStock">Initial Stock Quantity</Label>
                <Input 
                  id="initialStock" 
                  name="initialStock" 
                  type="number" 
                  value={formData.initialStock} 
                  onChange={handleChange} 
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;