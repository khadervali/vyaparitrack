import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, PlusCircle, Search, Filter, FileSpreadsheet, FileText as FileTextIcon, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProductForm from '@/components/products/ProductForm';
import api from '@/lib/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', type: '' });
  const { toast } = useToast();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: {
          searchTerm,
          ...filters
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchProducts();
  };

  // Handle product creation
  const handleCreateProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      setProducts([...products, response.data]);
      setIsAddModalOpen(false);
      toast({
        title: "Success",
        description: "Product created successfully.",
      });
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create product.",
        variant: "destructive",
      });
      throw error; // Re-throw to be caught by the form
    }
  };

  // Handle product update
  const handleUpdateProduct = async (productData) => {
    try {
      const response = await api.put(`/products/${currentProduct.id}`, productData);
      setProducts(products.map(p => p.id === currentProduct.id ? response.data : p));
      setIsEditModalOpen(false);
      setCurrentProduct(null);
      toast({
        title: "Success",
        description: "Product updated successfully.",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update product.",
        variant: "destructive",
      });
      throw error; // Re-throw to be caught by the form
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/products/${currentProduct.id}`);
      setProducts(products.filter(p => p.id !== currentProduct.id));
      setIsDeleteModalOpen(false);
      setCurrentProduct(null);
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete product.",
        variant: "destructive",
      });
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Products & Services</h1>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Product & Service List</CardTitle>
              <CardDescription>Manage your products, services, and pricing.</CardDescription>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
              </Button>
              <Button variant="outline" size="sm">
                <FileTextIcon className="mr-2 h-4 w-4" /> Export PDF
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10" 
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
            <div className="flex gap-2">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="">All Types</option>
                <option value="product">Products</option>
                <option value="service">Services</option>
              </select>
              <Button variant="outline" onClick={applyFilters}>
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-accent/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">SKU</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3 text-right">Sale Price</th>
                  <th scope="col" className="px-6 py-3 text-right">Stock</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Loading products...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No products found.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-accent/30">
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4">{product.sku}</td>
                      <td className="px-6 py-4">{product.type === 'service' ? 'Service' : 'Product'}</td>
                      <td className="px-6 py-4 text-right">₹{product.salePrice?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 text-right">
                        {product.type === 'service' ? 'N/A' : (
                          <span className={product.stockQuantity <= product.minStockQuantity ? 'text-red-500 font-medium' : ''}>
                            {product.stockQuantity || 0}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditModal(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openDeleteModal(product)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            onSave={handleCreateProduct} 
            onCancel={() => setIsAddModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={currentProduct} 
            onSave={handleUpdateProduct} 
            onCancel={() => setIsEditModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {currentProduct?.name}? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProductsPage;