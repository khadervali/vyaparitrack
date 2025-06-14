import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GSTReportGenerator from '@/components/dashboard/GSTReportGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GstToolsPage = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">GST Tools</h1>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="reports">GST Reports</TabsTrigger>
          <TabsTrigger value="calculator">GST Calculator</TabsTrigger>
          <TabsTrigger value="hsn">HSN Lookup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-4">
          <GSTReportGenerator />
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader>
              <CardTitle>GST Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount Type</label>
                    <Select defaultValue="exclusive">
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">Exclusive of GST</SelectItem>
                        <SelectItem value="inclusive">Inclusive of GST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount (₹)</label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">GST Rate (%)</label>
                    <Select defaultValue="18">
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Calculate
                  </Button>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Results</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Amount:</span>
                      <span className="font-medium">₹1,000.00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>CGST (9%):</span>
                      <span className="font-medium">₹90.00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>SGST (9%):</span>
                      <span className="font-medium">₹90.00</span>
                    </div>
                    
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold">₹1,180.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hsn" className="space-y-4">
          <Card className="card-glassmorphism">
            <CardHeader>
              <CardTitle>HSN/SAC Code Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input type="text" placeholder="Search by product name or HSN code" />
                  </div>
                  <Button>Search</Button>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-black/5 dark:bg-white/5">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">HSN/SAC Code</th>
                        <th className="text-left p-3 text-sm font-medium">Description</th>
                        <th className="text-left p-3 text-sm font-medium">GST Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-sm">8471</td>
                        <td className="p-3 text-sm">Computers and peripheral equipment</td>
                        <td className="p-3 text-sm">18%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm">6403</td>
                        <td className="p-3 text-sm">Footwear with leather uppers</td>
                        <td className="p-3 text-sm">5%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm">9503</td>
                        <td className="p-3 text-sm">Toys, games and sports requisites</td>
                        <td className="p-3 text-sm">12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Note: HSN (Harmonized System of Nomenclature) codes are used for classifying goods under GST.
                  SAC (Services Accounting Code) is used for services.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default GstToolsPage;