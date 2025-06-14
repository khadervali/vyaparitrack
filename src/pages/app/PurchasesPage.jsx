import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PurchasesPage = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Purchases</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          New Purchase Order
        </Button>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Purchase Orders</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search orders..." 
                    className="max-w-[200px]" 
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">PO Number</th>
                      <th className="text-left p-3 text-sm font-medium">Vendor</th>
                      <th className="text-left p-3 text-sm font-medium">Order Date</th>
                      <th className="text-left p-3 text-sm font-medium">Expected Date</th>
                      <th className="text-left p-3 text-sm font-medium">Amount</th>
                      <th className="text-left p-3 text-sm font-medium">Status</th>
                      <th className="text-left p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-sm">PO-{2023000 + i}</td>
                        <td className="p-3 text-sm">Vendor {i}</td>
                        <td className="p-3 text-sm">2025-06-{i}</td>
                        <td className="p-3 text-sm">2025-06-{i + 10}</td>
                        <td className="p-3 text-sm">₹{i * 2000 + 500}</td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            i % 3 === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            i % 3 === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Received' : 'Cancelled'}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            {i % 3 === 0 && <Button variant="ghost" size="sm">Receive</Button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Vendors</CardTitle>
                <Button>Add Vendor</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Vendor Name</th>
                      <th className="text-left p-3 text-sm font-medium">Contact Person</th>
                      <th className="text-left p-3 text-sm font-medium">Phone</th>
                      <th className="text-left p-3 text-sm font-medium">Email</th>
                      <th className="text-left p-3 text-sm font-medium">GSTIN</th>
                      <th className="text-left p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-sm">Vendor {i}</td>
                        <td className="p-3 text-sm">Contact {i}</td>
                        <td className="p-3 text-sm">+91 98765 4{i}000</td>
                        <td className="p-3 text-sm">vendor{i}@example.com</td>
                        <td className="p-3 text-sm">29ABCDE{i}234F1Z{i}</td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PurchasesPage;