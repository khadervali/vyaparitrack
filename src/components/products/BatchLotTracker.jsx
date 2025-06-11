import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

const BatchLotTracker = ({ productId }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBatch, setNewBatch] = useState({
    batchNumber: '',
    lotNumber: '',
    quantity: '',
    manufacturingDate: '',
    expiryDate: '',
    location: ''
  });
  const { toast } = useToast();

  // Fetch batches for the product
  useEffect(() => {
    if (productId) {
      fetchBatches();
    }
  }, [productId]);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/inventory/batches/${productId}`);
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
      toast({
        title: "Error",
        description: "Failed to load batch information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBatch(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBatch = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newBatch.batchNumber || !newBatch.quantity) {
      toast({
        title: "Validation Error",
        description: "Batch number and quantity are required.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post(`/inventory/batches/${productId}`, newBatch);
      setBatches([...batches, response.data]);
      setNewBatch({
        batchNumber: '',
        lotNumber: '',
        quantity: '',
        manufacturingDate: '',
        expiryDate: '',
        location: ''
      });
      toast({
        title: "Success",
        description: "Batch added successfully.",
      });
    } catch (error) {
      console.error('Error adding batch:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add batch.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Get status class based on days until expiry
  const getExpiryStatusClass = (daysUntilExpiry) => {
    if (daysUntilExpiry === null) return '';
    if (daysUntilExpiry <= 0) return 'text-red-500';
    if (daysUntilExpiry <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/20 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-4">Add New Batch</h3>
        <form onSubmit={handleAddBatch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="batchNumber">Batch Number*</Label>
            <Input
              id="batchNumber"
              name="batchNumber"
              value={newBatch.batchNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lotNumber">Lot Number</Label>
            <Input
              id="lotNumber"
              name="lotNumber"
              value={newBatch.lotNumber}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={newBatch.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Storage Location</Label>
            <Input
              id="location"
              name="location"
              value={newBatch.location}
              onChange={handleInputChange}
              placeholder="e.g., Shelf A-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
            <Input
              id="manufacturingDate"
              name="manufacturingDate"
              type="date"
              value={newBatch.manufacturingDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={newBatch.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Batch'}
            </Button>
          </div>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Batch/Lot Tracking</h3>
        {loading && <p>Loading batches...</p>}
        
        {!loading && batches.length === 0 ? (
          <p className="text-muted-foreground">No batches found for this product.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase bg-accent/50">
                <tr>
                  <th className="px-4 py-2">Batch #</th>
                  <th className="px-4 py-2">Lot #</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2">Manufacturing</th>
                  <th className="px-4 py-2">Expiry</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => {
                  const daysUntilExpiry = getDaysUntilExpiry(batch.expiryDate);
                  const expiryStatusClass = getExpiryStatusClass(daysUntilExpiry);
                  
                  return (
                    <tr key={batch.id} className="border-b">
                      <td className="px-4 py-2 font-medium">{batch.batchNumber}</td>
                      <td className="px-4 py-2">{batch.lotNumber || '-'}</td>
                      <td className="px-4 py-2 text-right">{batch.quantity}</td>
                      <td className="px-4 py-2">
                        {batch.manufacturingDate ? (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(batch.manufacturingDate).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {batch.expiryDate ? (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(batch.expiryDate).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-2">{batch.location || '-'}</td>
                      <td className={`px-4 py-2 ${expiryStatusClass}`}>
                        {daysUntilExpiry !== null ? (
                          <div className="flex items-center">
                            {daysUntilExpiry <= 30 && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {daysUntilExpiry <= 0 ? 'Expired' : `${daysUntilExpiry} days left`}
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchLotTracker;