import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, PlusCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

const SalesOrdersPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const { toast } = useToast();

  // Define fetchSalesOrders outside of useEffect
  const fetchSalesOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/salesorders'); // Fetch sales orders from the backend
      if (response.status !== 200) {
        throw new Error('Failed to fetch sales orders');
      }
      // Assuming the response data is directly the array of sales orders
      setSalesOrders(response.data); 
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

  useEffect(() => {
    const fetchSalesOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/salesorders'); // Fetch sales orders from the backend
        if (response.status !== 200) {
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
  }, []); // Added dependency array to prevent infinite loop
  fetchSalesOrders(); // Call fetchSalesOrders inside useEffect

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <h1 className="text-3xl font-bold text-foreground">Sales Order Management</h1>
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
 <div className="flex justify-end pt-4">
 <Button
 className="bg-primary hover:bg-primary/90 text-primary-foreground"
 onClick={() => setIsModalOpen(true)}>
 <PlusCircle className="mr-2 h-5 w-5" /> Create New Sales Order
 </Button> {/* Added onClick handler */}

 </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-foreground">
 <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20">
 <tr>
 <th scope="col" className="px-6 py-3">Sales Order Number</th>
 <th scope="col" className="px-6 py-3">Customer Name</th>
 <th scope="col" className="px-6 py-3">Date</th>
 <th scope="col" className="px-6 py-3">Status</th>
 <th scope="col" className="px-6 py-3">Total Amount</th>
 <th scope="col" className="px-6 py-3 text-center">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border/50 dark:divide-border/30">
 {loading && !error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">Loading sales orders...</td>
                  </tr>
                ) : error ? (
 <td colSpan="6" className="text-center py-8 text-destructive">{error.message || 'Error loading sales orders.'}</td>
                ) : (salesOrders?.length ?? 0) === 0 ? (
                  <>
 <tr>
                    <td colSpan="5" className="text-center py-8 text-muted-foreground">No sales orders yet.</td>
 </tr>
 </>
                ) : (
                  salesOrders.map((order) => (
                    <tr key={order._id || order.id} className="hover:bg-accent/30 dark:hover:bg-accent/10">
 <td className="px-6 py-4 font-medium whitespace-nowrap">{order.orderId || order.id}</td>

 <td className="px-6 py-4">{order.customer?.name || 'N/A'}</td>
 <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString() || 'N/A'}</td>
 <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        // Added status classes for better clarity and tailwind compatibility
 order.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                          order.status === "Shipped" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                          order.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" // Other status
                        }`}>{order.status}</span>
 </td>
 <td className="px-6 py-4 text-right font-semibold">₹{(order.total || 0).toFixed(2)}</td>

                    </tr>

                  ))
                )}
 </tbody>
 </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for Create New Sales Order */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000 // Ensure modal is on top
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', position: 'relative' }}>
            <h2 className="text-2xl font-bold mb-4">Create New Sales Order</h2>
            {/* Required fields for sales order will go here */}
            <div>
              <label htmlFor="customerName">Customer Name:</label>
              <input type="text" id="customerName" />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" />
            </div>
            <div>
              <label htmlFor="product">Product:</label>
              <input type="text" id="product" />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" />
            </div>
            {/* Add more fields as needed */}
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button> {/* Close button */}
          </div>
        </div>
      )}

      {/* Placeholder for Sales Order details or New Sales Order modal components */}
      {/* <SalesOrderDetailsModal /> */}
      {/* <NewSalesOrderModal /> */}
    </motion.div>
  );

}; // Moved closing brace here
