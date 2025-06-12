import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  PlusCircle, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileText as FileTextIcon,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import StockAdjustmentModal from '@/components/StockAdjustmentModal';
import AddProductModal from '@/components/AddProductModal';
import EditProductModal from '@/components/EditProductModal';
import InventoryTabs from './InventoryTabs';
import api from '@/lib/api';

const InventoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    purchasePrice: '',
    salePrice: '',
    initialStock: '',
    hsnSac: '',
    taxRate: '',
  });
  const [products, setProducts] = useState([]);
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false);
  const { toast } = useToast();
  const isMounted = useRef(false);
  const apiCallInProgress = useRef(false);

  const handleExportExcel = () => {
    alert("Export to Excel functionality (placeholder).");
  };

  const handleExportPDF = () => {
    alert("Export to PDF functionality (placeholder).");
  };

  // Memoize fetchProducts to prevent recreation on each render
  const fetchProducts = useCallback(async () => {
    // Prevent concurrent API calls
    if (apiCallInProgress.current) return;
    
    apiCallInProgress.current = true;
    setLoading(true);
    
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('searchTerm', searchTerm);
      
      console.log('Fetching products...', new Date().toISOString());
      const response = await api.get(`/products?${queryParams.toString()}`);
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
      apiCallInProgress.current = false;
    }
  }, [searchTerm, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      console.log('Saving product:', newProduct);
      const response = await api.post('/products', newProduct);
      toast({ title: 'Success', description: 'Product added successfully.' });
      setIsAddProductModalOpen(false);
      setNewProduct({
        name: '',
        sku: '',
        category: '',
        purchasePrice: '',
        salePrice: '',
        initialStock: '',
        hsnSac: '',
        taxRate: '',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({ title: 'Error', description: 'Failed to save product.', variant: 'destructive' });
    }
  };

  // Initial data load only
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchProducts();
    }
  }, [fetchProducts]);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Stats for inventory summary
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });

  // Fetch inventory statistics
  const fetchInventoryStats = useCallback(() => {
    try {
      // Use hardcoded stats for now
      setInventoryStats({
        totalProducts: products.filter(p => p.type !== 'service').length || 0,
        totalServices: products.filter(p => p.type === 'service').length || 0,
        lowStockItems: 2,
        outOfStockItems: 1
      });
    } catch (error) {
      console.error('Error calculating inventory stats:', error);
    }
  }, [products]);

  // Update stats when products change
  useEffect(() => {
    fetchInventoryStats();
  }, [products, fetchInventoryStats]);

  return (
    <>
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Inventory Management</h1>
        <div id="add-product-button">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground focus-ring shadow-lg shadow-primary/20"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Product/Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Inventory Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-glassmorphism card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <h3 className="text-2xl font-bold">{inventoryStats.totalProducts || 0}</h3>
              </div>
              <Package className="h-8 w-8 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card className="card-glassmorphism card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <h3 className="text-2xl font-bold">{inventoryStats.totalServices || 0}</h3>
              </div>
              <FileTextIcon className="h-8 w-8 text-blue-500 opacity-80" />
            </CardContent>
          </Card>
          
          <Card className="card-glassmorphism card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-yellow-500">{inventoryStats.lowStockItems || 0}</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500 opacity-80" />
            </CardContent>
          </Card>
          
          <Card className="card-glassmorphism card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <h3 className="text-2xl font-bold text-red-500">{inventoryStats.outOfStockItems || 0}</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500 opacity-80" />
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs and Content */}
        <Card className="card-glassmorphism">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <p className="text-muted-foreground">Manage your products, services, and stock levels</p>
              </div>
            </div>
            
            <InventoryTabs 
              products={products} 
              inventoryStats={inventoryStats} 
              fetchProducts={fetchProducts}
            />
            
            {/* Products Tab Content - This will be shown/hidden by the InventoryTabs component */}
            <div id="products-content">
              <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search products or SKU..." 
                    className="pl-10 bg-background/70 dark:bg-input focus-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="focus-ring"
                    onClick={() => toast({ 
                      title: "Coming Soon", 
                      description: "Filter functionality will be implemented soon." 
                    })}
                  >
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleExportExcel} 
                    className="focus-ring"
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-foreground">
                  <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20 backdrop-blur-sm">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-tl-md">Product Name</th>
                      <th scope="col" className="px-6 py-3">SKU</th>
                      <th scope="col" className="px-6 py-3">Category</th>
                      <th scope="col" className="px-6 py-3 text-right">Stock</th>
                      <th scope="col" className="px-6 py-3 text-right">Price</th>
                      <th scope="col" className="px-6 py-3 text-center rounded-tr-md">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-muted-foreground">Loading products...</td>
                      </tr>
                    ) : products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10 transition-colors">
                        <td className="px-6 py-4 font-medium whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4">{product.sku || 'N/A'}</td>
                        <td className="px-6 py-4">
                          {product.type === 'service' ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500">Service</span>
                          ) : (
                            product.category || 'Uncategorized'
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {product.type === 'service' ? 'N/A' : (
                            <span className={`font-medium ${
                              product.initialStock <= 0 ? 'text-red-500' : 
                              product.initialStock < 10 ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {product.initialStock}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{product.salePrice || product.purchasePrice}</td>
                        <td className="px-6 py-4 text-center">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 focus-ring" onClick={() => handleEditClick(product)}>Edit</Button>
                        </td>
                      </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-muted-foreground">No products or services found. Add your first one!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>

    <AddProductModal
      isOpen={isAddProductModalOpen}
      onClose={() => setIsAddProductModalOpen(false)}
      onProductAdded={fetchProducts}
      products={products}
      newProductData={newProduct}
      onInputChange={handleChange}
      onSave={handleSaveProduct}
    />

    <EditProductModal
      isOpen={isEditModalOpen}
      onClose={handleCloseEditModal}
      productToEdit={editingProduct}
      onProductUpdated={fetchProducts}
      products={products}
    />

    <StockAdjustmentModal
      isOpen={isStockAdjustmentModalOpen}
      onClose={() => setIsStockAdjustmentModalOpen(false)}
      onStockAdjusted={fetchProducts}
      products={products}
    />
    </>
  );
};

export default InventoryPage;