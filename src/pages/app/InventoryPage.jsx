import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  PlusCircle, 
  FileSpreadsheet, 
  FileText as FileTextIcon,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import StockAdjustmentModal from '@/components/StockAdjustmentModal';
import AddProductModal from '@/components/AddProductModal';
import EditProductModal from '@/components/EditProductModal';
import InventoryTabs from './InventoryTabs';
import DataTable from '@/components/ui/data-table';
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
    price: '',
    quantity: 0,
    stockQuantity: 0,
    minStockQuantity: 10,
    type: 'product',
    hsn_sac: '',
    gst_rate: 18,
  });
  const [products, setProducts] = useState([]);
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    sku: true,
    category: true,
    stock: true,
    price: true,
    actions: true
  });
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const { toast } = useToast();
  const isMounted = useRef(false);
  const apiCallInProgress = useRef(false);

  const handleExportExcel = () => {
    // Create a CSV string from products data
    const headers = ['Name', 'SKU', 'Category', 'Stock', 'Price'];
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        `"${product.name}"`,
        `"${product.sku || 'N/A'}"`,
        `"${product.category?.name || product.category || 'Uncategorized'}"`,
        product.type === 'service' ? 'N/A' : (product.stockQuantity || product.quantity || 0),
        product.price
      ].join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: 'Success', description: 'Inventory exported to CSV successfully.' });
  };

  const handleExportPDF = () => {
    toast({ title: 'Coming Soon', description: 'PDF export will be available in a future update.' });
  };
  
  const handleSort = (field) => {
    // If clicking the same field, toggle direction, otherwise set new field with asc direction
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Memoize fetchProducts to prevent recreation on each render
  const fetchProducts = useCallback(async () => {
    // Prevent concurrent API calls
    if (apiCallInProgress.current) return;
    
    apiCallInProgress.current = true;
    setLoading(true);
    
    try {
      console.log('Fetching products...', new Date().toISOString());
      const response = await api.get('/products');
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
  }, [toast]);
  
  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name?.toLowerCase().includes(searchLower) || 
      product.sku?.toLowerCase().includes(searchLower) ||
      product.category?.name?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower)
    );
  }, [products, searchTerm]);

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
        price: '',
        quantity: 0,
        stockQuantity: 0,
        minStockQuantity: 10,
        type: 'product',
        hsn_sac: '',
        gst_rate: 18,
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
  
  // Clear search when tab changes
  useEffect(() => {
    const handleTabChange = () => {
      setSearchTerm('');
    };
    
    // Add event listener for tab changes
    document.addEventListener('tabChange', handleTabChange);
    
    return () => {
      document.removeEventListener('tabChange', handleTabChange);
    };
  }, []);

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
      // Calculate actual stats from products data
      const productItems = products.filter(p => p.type !== 'service');
      const serviceItems = products.filter(p => p.type === 'service');
      const lowStock = productItems.filter(p => 
        p.stockQuantity > 0 && 
        p.stockQuantity < (p.minStockQuantity || 10)
      );
      const outOfStock = productItems.filter(p => 
        p.stockQuantity <= 0
      );
      
      setInventoryStats({
        totalProducts: productItems.length || 0,
        totalServices: serviceItems.length || 0,
        lowStockItems: lowStock.length || 0,
        outOfStockItems: outOfStock.length || 0
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
              <DataTable
                data={products}
                columns={[
                  {
                    key: 'name',
                    header: 'Product Name',
                    render: (row) => <span className="font-medium whitespace-nowrap">{row.name}</span>
                  },
                  {
                    key: 'sku',
                    header: 'SKU',
                    render: (row) => row.sku || 'N/A'
                  },
                  {
                    key: 'category',
                    header: 'Category',
                    render: (row) => row.type === 'service' ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500">Service</span>
                    ) : (
                      (row.category?.name || row.category || 'Uncategorized')
                    )
                  },
                  {
                    key: 'stockQuantity',
                    header: 'Stock',
                    className: 'text-right',
                    render: (row) => row.type === 'service' ? 'N/A' : (
                      <span className={`font-medium ${
                        row.stockQuantity <= 0 ? 'text-red-500' : 
                        row.stockQuantity < row.minStockQuantity ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {row.stockQuantity || row.quantity || 0}
                      </span>
                    )
                  },
                  {
                    key: 'price',
                    header: 'Price',
                    className: 'text-right',
                    render: (row) => <span className="font-medium">{row.price}</span>
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    className: 'text-center',
                    render: (row) => (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary/80 focus-ring" 
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </Button>
                    )
                  }
                ]}
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={10}
                loading={loading}
                emptyMessage="No products or services found. Add your first one!"
                actions={
                  <Button 
                    variant="outline" 
                    onClick={handleExportExcel} 
                    className="focus-ring"
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Export
                  </Button>
                }
              />
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