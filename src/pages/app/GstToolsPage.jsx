import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Percent, Search, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ToolCard = ({ title, description, icon, actionText, onAction }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 glassmorphism">
    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
      {React.cloneElement(icon, { className: "w-8 h-8 text-primary" })}
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText || "Use Tool"}
        </Button>
      )}
    </CardContent>
  </Card>
);

const GstToolsPage = () => {
  const tools = [
    { 
      title: "GSTIN Search", 
      description: "Verify GST Identification Numbers quickly and easily.", 
      icon: <Search />,
      actionText: "Search GSTIN",
      onAction: () => alert("GSTIN Search tool clicked (placeholder)")
    },
    { 
      title: "HSN/SAC Code Finder", 
      description: "Find appropriate HSN or SAC codes for your products and services.", 
      icon: <Percent />,
      actionText: "Find Code",
      onAction: () => alert("HSN/SAC Finder tool clicked (placeholder)")
    },
    { 
      title: "GSTR-2A/2B Reconciliation (Coming Soon)", 
      description: "Automate matching of purchase invoices with supplier-filed returns.", 
      icon: <FileText />,
    },
    { 
      title: "E-Invoice Generation (Coming Soon)", 
      description: "Generate IRN and QR codes for B2B invoices as per government norms.", 
      icon: <UploadCloud />,
    },
    { 
      title: "GST Return Filing Helper (Coming Soon)", 
      description: "Prepare data for GSTR-1 and GSTR-3B filings.", 
      icon: <FileText />,
    },
    { 
      title: "Default GST Rate Configuration", 
      description: "Set default GST percentages for faster invoice creation.", 
      icon: <Percent />,
      actionText: "Configure Rates",
      onAction: () => alert("Configure GST Rates tool clicked (placeholder)")
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">GST Tools & Compliance</h1>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle>GST Compliance Dashboard</CardTitle>
          <CardDescription>Overview of your GST filing status and important deadlines (Placeholder).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">GSTR-1 Due Date</p>
              <p className="text-xl font-semibold text-foreground">11th June 2025</p>
            </div>
            <div className="p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">GSTR-3B Due Date</p>
              <p className="text-xl font-semibold text-foreground">20th June 2025</p>
            </div>
            <div className="p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Last Filed</p>
              <p className="text-xl font-semibold text-foreground">May 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ToolCard 
              title={tool.title} 
              description={tool.description} 
              icon={tool.icon} 
              actionText={tool.actionText}
              onAction={tool.onAction}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GstToolsPage;