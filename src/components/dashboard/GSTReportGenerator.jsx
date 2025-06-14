import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import api from '@/lib/api';

const GSTReportGenerator = () => {
  const [reportType, setReportType] = useState('gstr1');
  const [period, setPeriod] = useState('current');
  const [format, setFormat] = useState('excel');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      
      // Call API to generate report
      const response = await api.get(`/api/gst/reports/${reportType}`, {
        params: { period, format },
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}_${period}.${format === 'excel' ? 'xlsx' : 'json'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate GST report:', error);
      setLoading(false);
      // Show error notification
      alert('Failed to generate report. Please try again.');
    }
  };

  return (
    <Card className="card-glassmorphism">
      <CardHeader>
        <CardTitle>GST Report Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectItem value="gstr1">GSTR-1 (Outward Supplies)</SelectItem>
              <SelectItem value="gstr2">GSTR-2 (Inward Supplies)</SelectItem>
              <SelectItem value="gstr3b">GSTR-3B (Summary)</SelectItem>
              <SelectItem value="b2b">B2B Invoice Report</SelectItem>
              <SelectItem value="b2c">B2C Invoice Report</SelectItem>
              <SelectItem value="hsn">HSN Summary Report</SelectItem>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Period</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="previous">Previous Month</SelectItem>
              <SelectItem value="quarter">Current Quarter</SelectItem>
              <SelectItem value="financial_year">Financial Year</SelectItem>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleGenerateReport} 
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="mb-2">Report Information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>GSTR-1: Report of outward supplies of goods and services</li>
            <li>GSTR-2: Report of inward supplies of goods and services</li>
            <li>GSTR-3B: Monthly summary of sales, purchases, and tax liability</li>
            <li>B2B: Business to Business transaction report</li>
            <li>B2C: Business to Consumer transaction report</li>
            <li>HSN: Harmonized System of Nomenclature summary report</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GSTReportGenerator;