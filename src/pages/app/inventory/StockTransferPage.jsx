import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Search, PlusCircle, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';

const StockTransferPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTransfer, setNewTransfer] = useState({
    productId: '',
    fromBranchId: '',
    toBranchId: '',
    quantity: '',
    notes: '',
  });
  const { toast } = useToast();

  // Fetch transfers, products, and branches
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch transfers
        const transfersResponse = await api.get('/inventory/transfers');
        setTransfers(transfersResponse.data);
        
        // Fetch products
        const productsResponse = await api.get('/products');
        setProducts(productsResponse.data);
        
        // Fetch branches
        const branchesResponse = await api.get('/branches');
        setBranches(branchesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  // Handle input change for new transfer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransfer(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for new transfer
  const handleSelectChange = (name, value) => {
    setNewTransfer(prev => ({ ...prev, [name]: value }));
  };

  // Create new transfer
  const handleCreateTransfer = async () => {
    // Validate form
    if (!newTransfer.productId || !newTransfer.fromBranchId || !newTransfer.toBranchId || !newTransfer.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newTransfer.fromBranchId === newTransfer.toBranchId) {
      toast({
        title: "Error",
        description: "Source and destination branches cannot be the same.",
        variant: "destructive",
      });
      return;
    }

    if (parseInt(newTransfer.quantity) <= 0) {
      toast({
        title: "Error",
        description: "Quantity must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.post('/inventory/transfers', newTransfer);
      
      toast({
        title: "Success",
        description: "Stock transfer created successfully.",
      });
      
      // Reset form and refresh transfers
      setNewTransfer({
        productId: '',
        fromBranchId: '',
        toBranchId: '',
        quantity: '',
        notes: '',
      });
      
      // Add the new transfer to the list
      setTransfers(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error creating transfer:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create stock transfer.",
        variant: "destructive",
      });
    }
  };

  // Filter transfers based on search term
  const filteredTransfers = transfers.filter(transfer =>
    transfer.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.fromBranchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.toBranchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get product name by ID
  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  // Get branch name by ID
  const getBranchName = (branchId) => {
    const branch = branches.find(b => b.id === branchId);
    return branch ? branch.name : 'Unknown Branch';
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Stock Transfer</h1>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>Create New Transfer</CardTitle>
          <CardDescription>Transfer stock between branches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select 
                  value={newTransfer.productId} 
                  onValueChange={(value) => handleSelectChange('productId', value)}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fromBranch">From Branch</Label>
                <Select 
                  value={newTransfer.fromBranchId} 
                  onValueChange={(value) => handleSelectChange('fromBranchId', value)}
                >
                  <SelectTrigger id="fromBranch">
                    <SelectValue placeholder="Select source branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="toBranch">To Branch</Label>
                <Select 
                  value={newTransfer.toBranchId} 
                  onValueChange={(value) => handleSelectChange('toBranchId', value)}
                >
                  <SelectTrigger id="toBranch">
                    <SelectValue placeholder="Select destination branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={newTransfer.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                name="notes"
                value={newTransfer.notes}
                onChange={handleInputChange}
                placeholder="Add notes about this transfer"
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end">
              <Button onClick={handleCreateTransfer}>
                <Save className="mr-2 h-4 w-4" /> Create Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>Recent stock transfers between branches</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search transfers..." 
                className="pl-10 bg-background/70 dark:bg-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-foreground">
              <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">From Branch</th>
                  <th scope="col" className="px-6 py-3">To Branch</th>
                  <th scope="col" className="px-6 py-3 text-right">Quantity</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-muted-foreground">Loading transfers...</td>
                  </tr>
                ) : filteredTransfers.length > 0 ? (
                  filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(transfer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {transfer.productName || getProductName(transfer.productId)}
                      </td>
                      <td className="px-6 py-4">
                        {transfer.fromBranchName || getBranchName(transfer.fromBranchId)}
                      </td>
                      <td className="px-6 py-4">
                        {transfer.toBranchName || getBranchName(transfer.toBranchId)}
                      </td>
                      <td className="px-6 py-4 text-right">{transfer.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transfer.status === 'completed' 
                            ? 'bg-green-500/20 text-green-500' 
                            : transfer.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {transfer.status || 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{transfer.notes || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No transfers match your search.' : 'No stock transfers found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StockTransferPage;