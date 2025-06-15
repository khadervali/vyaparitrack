import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';

const SalesOrdersPage = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Sales Orders</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          New Sales Order
        </Button>
      </div>

      <Card className="card-glassmorphism">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Orders</CardTitle>

          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={[
              { id: 1, orderId: 'SO-2023001', customer: 'Customer 1', date: '2025-06-11', amount: '₹1500', status: 'Pending' },
              { id: 2, orderId: 'SO-2023002', customer: 'Customer 2', date: '2025-06-12', amount: '₹2500', status: 'Completed' },
              { id: 3, orderId: 'SO-2023003', customer: 'Customer 3', date: '2025-06-13', amount: '₹3500', status: 'Cancelled' },
              { id: 4, orderId: 'SO-2023004', customer: 'Customer 4', date: '2025-06-14', amount: '₹4500', status: 'Pending' },
              { id: 5, orderId: 'SO-2023005', customer: 'Customer 5', date: '2025-06-15', amount: '₹5500', status: 'Completed' },
              { id: 6, orderId: 'SO-2023006', customer: 'Customer 6', date: '2025-06-16', amount: '₹6500', status: 'Pending' },
              { id: 7, orderId: 'SO-2023007', customer: 'Customer 7', date: '2025-06-17', amount: '₹7500', status: 'Completed' },
              { id: 8, orderId: 'SO-2023008', customer: 'Customer 8', date: '2025-06-18', amount: '₹8500', status: 'Cancelled' },
              { id: 9, orderId: 'SO-2023009', customer: 'Customer 9', date: '2025-06-19', amount: '₹9500', status: 'Pending' },
              { id: 10, orderId: 'SO-2023010', customer: 'Customer 10', date: '2025-06-20', amount: '₹10500', status: 'Completed' },
              { id: 11, orderId: 'SO-2023011', customer: 'Customer 11', date: '2025-06-21', amount: '₹11500', status: 'Cancelled' },
              { id: 12, orderId: 'SO-2023012', customer: 'Customer 12', date: '2025-06-22', amount: '₹12500', status: 'Pending' }
            ]}
            columns={[
              {
                key: 'orderId',
                header: 'Order ID'
              },
              {
                key: 'customer',
                header: 'Customer'
              },
              {
                key: 'date',
                header: 'Date'
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
                    row.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
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
                    <Button variant="ghost" size="sm">Print</Button>
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
    </motion.div>
  );
};

export default SalesOrdersPage;