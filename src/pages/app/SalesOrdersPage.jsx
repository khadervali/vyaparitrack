jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, PlusCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const SalesOrdersPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSalesOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/salesorders'); // Fetch sales orders from the backend
        if (!response.ok) {
          throw new Error('Failed to fetch sales orders');
        }
        const data = await response.json();
        setSalesOrders(data);
      } catch (error) {
        console.error('Error fetching sales orders:', error);
        setError(error);
        toast({
          title: "Error",
          description: "Failed to load sales orders.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSalesOrders();
  }, [toast]); // Depend on toast to avoid lint warnings if used inside effect

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Sales Order Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> New Sales Order
        </Button>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>Sales Orders</CardTitle>
          <CardDescription>Manage your sales orders and track their status.</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search Sales Orders..." className="pl-10 bg-background/70 dark:bg-input" />
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
                  <th scope="col" className="px-6 py-3">Creation Date</th>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3 text-right">Total</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border/30">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-muted-foreground">Loading sales orders...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-destructive">{error.message || 'Error loading sales orders.'}</td>
                  </tr>
                ) : salesOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-muted-foreground">No sales orders yet.</td>
                  </tr>
                ) : (
                  salesOrders.map((order) => (
                    <tr key={order._id || order.id} className="hover:bg-accent/30 dark:hover:bg-accent/10">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{order.orderId || order.id}</td>
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">
                       <span className="font-semibold">₹{(order.total || 0).toFixed(2)}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "Shipped" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                          order.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" // Other status
                        }`}>{order.status}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View/Edit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for Sales Order details or New Sales Order modal components */}
      {/* <SalesOrderDetailsModal /> */}
      {/* <NewSalesOrderModal /> */}

    </motion.div>
  );
};

export default SalesOrdersPage;