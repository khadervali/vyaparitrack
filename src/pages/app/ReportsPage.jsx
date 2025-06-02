import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assuming you might need date pickers or similar

const ReportCard = ({ title, description, icon }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 glassmorphism">
    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
      {React.cloneElement(icon, { className: "w-8 h-8 text-primary" })}
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" /> Generate Report
      </Button>
    </CardContent>
  </Card>
);

const ReportsPage = () => {
  const reports = [
    { title: "Stock Summary", description: "Overview of current stock levels, valuation, and aging.", icon: <BarChart3 /> },
    { title: "Sales Summary", description: "Detailed report of sales, revenue, and profit margins over a period.", icon: <BarChart3 /> },
    { title: "Purchase Summary", description: "Track all purchases, costs, and supplier performance.", icon: <BarChart3 /> },
    { title: "Low Stock Items", description: "Identify products nearing or below reorder points.", icon: <BarChart3 /> },
    { title: "Tax Reports (GSTR)", description: "Generate GSTR-1, GSTR-3B, and other GST compliance reports.", icon: <BarChart3 /> },
    { title: "Profit & Loss Statement", description: "Financial summary of revenues, costs, and expenses.", icon: <BarChart3 /> },
    { title: "Balance Sheet", description: "Snapshot of your company's assets, liabilities, and equity.", icon: <BarChart3 /> },
    { title: "Ledger Report", description: "Detailed transaction history for specific accounts.", icon: <BarChart3 /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select date ranges and other filters to customize your reports.</CardDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div>
              <label htmlFor="dateFrom" className="text-sm font-medium text-muted-foreground">Date From</label>
              <Input type="date" id="dateFrom" className="mt-1 bg-background/70 dark:bg-input" />
            </div>
            <div>
              <label htmlFor="dateTo" className="text-sm font-medium text-muted-foreground">Date To</label>
              <Input type="date" id="dateTo" className="mt-1 bg-background/70 dark:bg-input" />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ReportCard title={report.title} description={report.description} icon={report.icon} />
          </motion.div>
        ))}
      </div>
      
      <Card className="shadow-lg glassmorphism">
        <CardHeader>
            <CardTitle>Custom Report Builder (Coming Soon)</CardTitle>
            <CardDescription>Create your own reports by selecting specific data points and metrics.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature will allow for highly flexible and tailored reporting to meet unique business needs.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportsPage;