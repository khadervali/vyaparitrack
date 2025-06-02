import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, PlusCircle, Search, Filter, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SalesPage = () => {
  // Placeholder data
  const salesOrders = [
    { id: "SO-001", date: "2025-05-20", customer: "Customer Alpha", total: "₹5500", status: "Completed" },
    { id: "SO-002", date: "2025-05-21", customer: "Customer Beta", total: "₹3200", status: "Pending" },
    { id: "SO-003", date: "2025-05-22", customer: "Customer Gamma", total: "₹8900", status: "Shipped" },
  ];

  const invoices = [
    { id: "INV-001", date: "2025-05-20", customer: "Customer Alpha", total: "₹5500", status: "Paid" },
    { id: "INV-002", date: "2025-05-21", customer: "Customer Beta", total: "₹3200", status: "Unpaid" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Sales Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <PlusCircle className="mr-2 h-5 w-5" /> New Sales Order
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <FileText className="mr-2 h-5 w-5" /> Create Invoice
          </Button>
        </div>
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
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3 text-right">Total</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.map((order) => (
                  <tr key={order.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-right">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           {salesOrders.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No sales orders yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Manage your invoices and track payment status.</CardDescription>
           <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search Invoices..." className="pl-10 bg-background/70 dark:bg-input" />
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
                  <th scope="col" className="px-6 py-3">Invoice ID</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3 text-right">Total</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{invoice.id}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">{invoice.customer}</td>
                    <td className="px-6 py-4 text-right">{invoice.total}</td>
                     <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}>{invoice.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {invoices.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No invoices yet.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesPage;