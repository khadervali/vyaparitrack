import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';

const CustomersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Customers</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Customer Directory</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search customers..." 
                    className="max-w-[200px]" 
                  />
                  <Select defaultValue="all">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Name</th>
                      <th className="text-left p-3 text-sm font-medium">Phone</th>
                      <th className="text-left p-3 text-sm font-medium">Email</th>
                      <th className="text-left p-3 text-sm font-medium">Type</th>
                      <th className="text-left p-3 text-sm font-medium">Total Orders</th>
                      <th className="text-left p-3 text-sm font-medium">Total Value</th>
                      <th className="text-left p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-sm">Customer {i}</td>
                        <td className="p-3 text-sm">+91 98765 4{i}000</td>
                        <td className="p-3 text-sm">customer{i}@example.com</td>
                        <td className="p-3 text-sm">
                          {i % 3 === 0 ? 'Retail' : i % 3 === 1 ? 'Wholesale' : 'Distributor'}
                        </td>
                        <td className="p-3 text-sm">{i * 3 + 2}</td>
                        <td className="p-3 text-sm">₹{i * 5000 + 2500}</td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
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
        
        <TabsContent value="active" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader>
              <CardTitle>Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Name</th>
                      <th className="text-left p-3 text-sm font-medium">Last Order</th>
                      <th className="text-left p-3 text-sm font-medium">Total Orders</th>
                      <th className="text-left p-3 text-sm font-medium">Total Value</th>
                      <th className="text-left p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-sm">Customer {i}</td>
                        <td className="p-3 text-sm">2025-06-{10 + i}</td>
                        <td className="p-3 text-sm">{i * 3 + 2}</td>
                        <td className="p-3 text-sm">₹{i * 5000 + 2500}</td>
                        <td className="p-3 text-sm">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader>
              <CardTitle>Inactive Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Name</th>
                      <th className="text-left p-3 text-sm font-medium">Last Order</th>
                      <th className="text-left p-3 text-sm font-medium">Days Inactive</th>
                      <th className="text-left p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[4, 5].map((i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-sm">Customer {i}</td>
                        <td className="p-3 text-sm">2025-03-{i * 2}</td>
                        <td className="p-3 text-sm">{i * 30}</td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm" className="text-blue-500">Reactivate</Button>
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

export default CustomersPage;