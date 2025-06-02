jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom'; // Assuming React Router for URL parameters
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Assuming similar Card component
import { useToast } from '@/components/ui/use-toast';

const SalesOrderDetailPage = () => {
  const { id } = useParams(); // Get the sales order ID from the URL
  const [salesOrder, setSalesOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSalesOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/salesorders/${id}`); // Fetch specific sales order by ID
        if (!response.ok) {
          throw new Error('Failed to fetch sales order details');
        }
        const data = await response.json();
        setSalesOrder(data);
      } catch (err) {
        console.error(`Error fetching sales order ${id} details:`, err);
        setError(err);
        toast({
          title: "Error",
          description: `Failed to load sales order details for ID: ${id}.`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Only fetch if ID is available in the URL
      fetchSalesOrderDetails();
    }
  }, [id, toast]); // Re-run effect if ID changes or toast is available

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-foreground">Sales Order Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>Details for Sales Order ID: {id}</CardTitle>
          <CardDescription>Comprehensive information about this sales order.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading sales order details...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : !salesOrder ? (
            <p>Sales order not found.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer:</p>
                <p className="text-foreground">{salesOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount:</p>
                <p className="text-foreground">₹{salesOrder.total ? salesOrder.total.toFixed(2) : '0.00'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status:</p>
                <p className="text-foreground">{salesOrder.status}</p>
              </div>
              {/* Add more details as needed based on your sales order structure */}
              {salesOrder.createdAt && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creation Date:</p>
                  <p className="text-foreground">{new Date(salesOrder.createdAt).toLocaleDateString()}</p>
                </div>
              )}
              {/* Add sections for items, shipping address, payment info, etc. */}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesOrderDetailPage;