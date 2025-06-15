import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';

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

              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={[
                  { id: 1, poNumber: 'PO-2023001', vendor: 'Vendor 1', orderDate: '2025-06-1', expectedDate: '2025-06-11', amount: '₹2500', status: 'Pending' },
                  { id: 2, poNumber: 'PO-2023002', vendor: 'Vendor 2', orderDate: '2025-06-2', expectedDate: '2025-06-12', amount: '₹4500', status: 'Received' },
                  { id: 3, poNumber: 'PO-2023003', vendor: 'Vendor 3', orderDate: '2025-06-3', expectedDate: '2025-06-13', amount: '₹6500', status: 'Cancelled' },
                  { id: 4, poNumber: 'PO-2023004', vendor: 'Vendor 4', orderDate: '2025-06-4', expectedDate: '2025-06-14', amount: '₹8500', status: 'Pending' },
                  { id: 5, poNumber: 'PO-2023005', vendor: 'Vendor 5', orderDate: '2025-06-5', expectedDate: '2025-06-15', amount: '₹10500', status: 'Received' },
                  { id: 6, poNumber: 'PO-2023006', vendor: 'Vendor 6', orderDate: '2025-06-6', expectedDate: '2025-06-16', amount: '₹12500', status: 'Cancelled' },
                  { id: 7, poNumber: 'PO-2023007', vendor: 'Vendor 7', orderDate: '2025-06-7', expectedDate: '2025-06-17', amount: '₹14500', status: 'Pending' },
                  { id: 8, poNumber: 'PO-2023008', vendor: 'Vendor 8', orderDate: '2025-06-8', expectedDate: '2025-06-18', amount: '₹16500', status: 'Received' },
                  { id: 9, poNumber: 'PO-2023009', vendor: 'Vendor 9', orderDate: '2025-06-9', expectedDate: '2025-06-19', amount: '₹18500', status: 'Cancelled' },
                  { id: 10, poNumber: 'PO-2023010', vendor: 'Vendor 10', orderDate: '2025-06-10', expectedDate: '2025-06-20', amount: '₹20500', status: 'Pending' },
                  { id: 11, poNumber: 'PO-2023011', vendor: 'Vendor 11', orderDate: '2025-06-11', expectedDate: '2025-06-21', amount: '₹22500', status: 'Received' }
                ]}
                columns={[
                  {
                    key: 'poNumber',
                    header: 'PO Number'
                  },
                  {
                    key: 'vendor',
                    header: 'Vendor'
                  },
                  {
                    key: 'orderDate',
                    header: 'Order Date'
                  },
                  {
                    key: 'expectedDate',
                    header: 'Expected Date'
                  },
                  {
                    key: 'amount',
                    header: 'Amount',
                    className: 'text-right'
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                        row.status === 'Received' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {row.status}
                      </span>
                    )
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (row) => (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        {row.status === 'Pending' && <Button variant="ghost" size="sm">Receive</Button>}
                      </div>
                    )
                  }
                ]}
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={5}
              />
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
              <DataTable
                data={[
                  { id: 1, name: 'Vendor 1', contactPerson: 'Contact 1', phone: '+91 98765 41000', email: 'vendor1@example.com', gstin: '29ABCDE1234F1Z1' },
                  { id: 2, name: 'Vendor 2', contactPerson: 'Contact 2', phone: '+91 98765 42000', email: 'vendor2@example.com', gstin: '29ABCDE2234F1Z2' },
                  { id: 3, name: 'Vendor 3', contactPerson: 'Contact 3', phone: '+91 98765 43000', email: 'vendor3@example.com', gstin: '29ABCDE3234F1Z3' },
                  { id: 4, name: 'Vendor 4', contactPerson: 'Contact 4', phone: '+91 98765 44000', email: 'vendor4@example.com', gstin: '29ABCDE4234F1Z4' },
                  { id: 5, name: 'Vendor 5', contactPerson: 'Contact 5', phone: '+91 98765 45000', email: 'vendor5@example.com', gstin: '29ABCDE5234F1Z5' },
                  { id: 6, name: 'Vendor 6', contactPerson: 'Contact 6', phone: '+91 98765 46000', email: 'vendor6@example.com', gstin: '29ABCDE6234F1Z6' },
                  { id: 7, name: 'Vendor 7', contactPerson: 'Contact 7', phone: '+91 98765 47000', email: 'vendor7@example.com', gstin: '29ABCDE7234F1Z7' },
                  { id: 8, name: 'Vendor 8', contactPerson: 'Contact 8', phone: '+91 98765 48000', email: 'vendor8@example.com', gstin: '29ABCDE8234F1Z8' },
                  { id: 9, name: 'Vendor 9', contactPerson: 'Contact 9', phone: '+91 98765 49000', email: 'vendor9@example.com', gstin: '29ABCDE9234F1Z9' },
                  { id: 10, name: 'Vendor 10', contactPerson: 'Contact 10', phone: '+91 98765 40000', email: 'vendor10@example.com', gstin: '29ABCDE0234F1Z0' },
                  { id: 11, name: 'Vendor 11', contactPerson: 'Contact 11', phone: '+91 98765 41100', email: 'vendor11@example.com', gstin: '29ABCDE1234F1Z0' }
                ]}
                columns={[
                  {
                    key: 'name',
                    header: 'Vendor Name'
                  },
                  {
                    key: 'contactPerson',
                    header: 'Contact Person'
                  },
                  {
                    key: 'phone',
                    header: 'Phone'
                  },
                  {
                    key: 'email',
                    header: 'Email'
                  },
                  {
                    key: 'gstin',
                    header: 'GSTIN'
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (row) => (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    )
                  }
                ]}
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PurchasesPage;