import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, PlusCircle, Search, Filter, FileSpreadsheet, FileText as FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Assuming you have Dialog and DialogTrigger components
// import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

import StockAdjustmentModal from '@/components/StockAdjustmentModal'; // Import the new modal
const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Corrected: Removed duplicate declaration
  const [searchTerm, setSearchTerm] = useState(''); // Added: State for search term
  const [editingProduct, setEditingProduct] = useState(null);
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false); // State for Stock Adjustment Modal
  const { toast } = useToast();

  const handleExportExcel = () => {
    alert("Export to Excel functionality (placeholder).");
  };

  const handleExportPDF = () => {
    alert("Export to PDF functionality (placeholder).");
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('searchTerm', searchTerm);
      // Assuming 'filters' is an object like { category: 'Electronics', type: 'product' }
      // Object.keys(filters).forEach(key => queryParams.append(key, filters[key])); // Uncomment and adjust as needed for filters
      const url = `/api/products?${queryParams.toString()}`;
      const response = await fetch(url); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
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

  useEffect(() => {
    fetchProducts();
  }, [toast]); // Added toast as a dependency for useEffect

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null); // Clear the editing product when modal closes
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };


  return (
    <>
    <motion.div
 className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Product/Service
        </Button>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Product & Service List</CardTitle>
              <CardDescription>Manage your products, services, stock levels, and pricing.</CardDescription>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileTextIcon className="mr-2 h-4 w-4" /> Export PDF
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search products or SKU..." className="pl-10 bg-background/70 dark:bg-input" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-foreground">
              <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">SKU</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3 text-right">Stock</th>
                  <th scope="col" className="px-6 py-3 text-right">Price</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4">{product.sku || 'N/A'}</td> {/* Assuming SKU might not always exist */}
                    <td className="px-6 py-4">{product.type === 'service' ? 'Service' : (product.category || 'Uncategorized')}</td> {/* Assuming category might not always exist */}
                    <td className="px-6 py-4 text-right">{product.type === 'service' ? 'N/A' : product.stockQuantity}</td> {/* Using stockQuantity from backend */}
                    <td className="px-6 py-4 text-right">{product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => handleEditClick(product)}>Edit</Button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No products or services found. Add your first one!</p>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md glassmorphism">
          <CardHeader>
            <CardTitle>Quick Inventory Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start"><Package className="mr-2 h-4 w-4" /> Manage Categories</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setIsStockAdjustmentModalOpen(true)}><Package className="mr-2 h-4 w-4" /> Stock Adjustments</Button>
            <Button variant="outline" className="w-full justify-start"><Package className="mr-2 h-4 w-4" /> Internal Stock Transfer</Button>
          </CardContent>
        </Card>
        <Card className="shadow-md glassmorphism">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total Products:</span> <span className="font-semibold">3</span></div>
            <div className="flex justify-between"><span>Total Services:</span> <span className="font-semibold">1</span></div>
            <div className="flex justify-between"><span>Items Low in Stock:</span> <span className="font-semibold text-yellow-500">2</span></div>
            <div className="flex justify-between"><span>Items Out of Stock:</span> <span className="font-semibold text-red-500">0</span></div>
          </CardContent>
        </Card>
      </div>

    </motion.div>

    <AddProductModal
      isOpen={isAddProductModalOpen}
      onClose={() => setIsAddProductModalOpen(false)}
      onProductAdded={fetchProducts} // Refetch products after adding
    />

    {/* Edit Product Modal */}
    <EditProductModal
      isOpen={isEditModalOpen}
      onClose={handleCloseEditModal}
      productToEdit={editingProduct}
      onProductUpdated={fetchProducts} // Refetch products after editing
    />

    {/* Stock Adjustment Modal */}
    <StockAdjustmentModal
      isOpen={isStockAdjustmentModalOpen}
      onClose={() => setIsStockAdjustmentModalOpen(false)}
      onStockAdjusted={fetchProducts} // Pass fetchProducts as a prop
    />
    </>
  );
};

export default InventoryPage;