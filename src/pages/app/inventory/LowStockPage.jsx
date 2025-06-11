import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search, Filter, ShoppingCart, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

const LowStockPage = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Fetch low stock items
  const fetchLowStockItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory/low-stock');
      setLowStockItems(response.data);
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      toast({
        title: "Error",
        description: "Failed to load low stock items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockItems();
  }, []);

  // Filter items based on search term
  const filteredItems = lowStockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle reorder action
  const handleReorder = async (productId) => {
    try {
      // This would typically create a purchase order or add to an existing one
      await api.post('/purchase-orders/quick-reorder', { productId });
      toast({
        title: "Success",
        description: "Product added to purchase order.",
      });
    } catch (error) {
      console.error('Error creating reorder:', error);
      toast({
        title: "Error",
        description: "Failed to create reorder.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Low Stock Items</h1>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={fetchLowStockItems}
        >
          <AlertCircle className="mr-2 h-5 w-5" /> Refresh List
        </Button>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Low Stock Alert</CardTitle>
              <CardDescription>Items that need to be restocked soon</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search products or SKU..." 
                className="pl-10 bg-background/70 dark:bg-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                  <th scope="col" className="px-6 py-3 text-right">Current Stock</th>
                  <th scope="col" className="px-6 py-3 text-right">Min Stock</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-muted-foreground">Loading low stock items...</td>
                  </tr>
                ) : filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4">{item.sku || 'N/A'}</td>
                      <td className="px-6 py-4">{item.category || 'Uncategorized'}</td>
                      <td className="px-6 py-4 text-right">{item.currentStock}</td>
                      <td className="px-6 py-4 text-right">{item.minStock}</td>
                      <td className="px-6 py-4 text-center">
                        {item.currentStock === 0 ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">Out of Stock</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">Low Stock</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-primary hover:text-primary/80"
                          onClick={() => handleReorder(item.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> Reorder
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => window.location.href = `/app/inventory?id=${item.id}`}
                        >
                          <ArrowUpDown className="h-4 w-4 mr-1" /> Adjust
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No low stock items match your search.' : 'No low stock items found. Great job!'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md glassmorphism">
          <CardHeader>
            <CardTitle>Stock Level Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Low Stock Items:</span> 
              <span className="font-semibold text-yellow-500">{lowStockItems.filter(item => item.currentStock > 0).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Out of Stock Items:</span> 
              <span className="font-semibold text-red-500">{lowStockItems.filter(item => item.currentStock === 0).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Items Needing Immediate Attention:</span> 
              <span className="font-semibold text-red-500">{lowStockItems.filter(item => item.currentStock < item.minStock * 0.5).length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md glassmorphism">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/app/purchases/new'}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Create Purchase Order
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/app/inventory'}>
              <ArrowUpDown className="mr-2 h-4 w-4" /> Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default LowStockPage;