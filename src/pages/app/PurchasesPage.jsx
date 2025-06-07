import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, PlusCircle, Search, Filter } from 'lucide-react';
// Import NewPurchaseOrderModal component
import NewPurchaseOrderModal from '@/components/NewPurchaseOrderModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { apiUrl } from '@/lib/api';

const PurchasesPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewPurchaseOrderModalOpen, setIsNewPurchaseOrderModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl('api/purchaseorders')); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch purchase orders');
        }
        const data = await response.json();
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
        toast({
          title: "Error",
          description: "Failed to load purchase orders.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseOrders();
  }, [toast]);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Purchase Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsNewPurchaseOrderModalOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" /> New Purchase Order
        </Button>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Manage your purchase orders and track their status.</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search Purchase Orders..." className="pl-10 bg-background/70 dark:bg-input" />
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
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Supplier</th>
                  <th scope="col" className="px-6 py-3 text-right">Total</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-muted-foreground">Loading purchase orders...</td>
                  </tr>
                ) : purchaseOrders.length === 0 ? (
                  <tr>
                     <td colSpan="6" className="text-center py-8 text-muted-foreground">No purchase orders yet.</td>
                  </tr>
                ) : (
                purchaseOrders.map((order) => (
                  <tr key={order._id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{order.orderId}</td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "Received" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                        order.status === "Ordered" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" // Partial Received
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View/Edit</Button>
                    </td>
                  </tr>
                )))}
                </>
              </tbody>
            </table>

          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md glassmorphism">
        <CardHeader>
            <CardTitle>Supplier Management (Placeholder)</CardTitle>
            <CardDescription>Manage your suppliers and their contact details.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Supplier list and management tools will appear here.</p>
            <Button variant="outline" className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Add New Supplier</Button>
        </CardContent>
      </Card>

    </motion.div>

    {/* New Purchase Order Modal */}
    <NewPurchaseOrderModal
      isOpen={isNewPurchaseOrderModalOpen}
      onClose={() => setIsNewPurchaseOrderModalOpen(false)}
      onPurchaseOrderCreated={() => {
        // Fetch purchase orders again when a new one is created
        setLoading(true);
        fetch(apiUrl('api/purchaseorders'))
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch purchase orders');
            return response.json();
          })
          .then(data => {
            setPurchaseOrders(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching purchase orders:', error);
            toast({
              title: "Error",
              description: "Failed to refresh purchase orders.",
              variant: "destructive",
            });
            setLoading(false);
          });
      }}
    />
    </>
  );
};

export default PurchasesPage;