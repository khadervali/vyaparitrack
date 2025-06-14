import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

const InventoryInsights = () => {
  const [insights, setInsights] = useState({
    topProducts: [],
    lowStock: [],
    expiringItems: [],
    loading: true
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setInsights(prev => ({ ...prev, loading: true }));
        const response = await api.get('/api/inventory/insights');
        setInsights({
          topProducts: response.data.topProducts || [],
          lowStock: response.data.lowStock || [],
          expiringItems: response.data.expiringItems || [],
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch inventory insights:', error);
        // Mock data for development
        setInsights({
          topProducts: [
            { id: 1, name: 'Product A', quantity: 120, value: 12000 },
            { id: 2, name: 'Product B', quantity: 85, value: 8500 },
            { id: 3, name: 'Product C', quantity: 65, value: 6500 }
          ],
          lowStock: [
            { id: 4, name: 'Product D', quantity: 5, threshold: 10 },
            { id: 5, name: 'Product E', quantity: 3, threshold: 15 },
            { id: 6, name: 'Product F', quantity: 2, threshold: 20 }
          ],
          expiringItems: [
            { id: 7, name: 'Product G', expiryDate: '2025-07-15', quantity: 10 },
            { id: 8, name: 'Product H', expiryDate: '2025-07-20', quantity: 15 },
            { id: 9, name: 'Product I', expiryDate: '2025-07-25', quantity: 8 }
          ],
          loading: false
        });
      }
    };

    fetchInsights();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="card-glassmorphism">
      <CardHeader>
        <CardTitle>Inventory Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Products by Value */}
          <div>
            <h3 className="text-sm font-medium mb-3">Top Products by Value</h3>
            {insights.loading ? (
              <div className="h-[150px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {insights.topProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm truncate max-w-[150px]">{product.name}</span>
                    <span className="text-sm font-medium">₹{product.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Items */}
          <div>
            <h3 className="text-sm font-medium mb-3">Low Stock Items</h3>
            {insights.loading ? (
              <div className="h-[150px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {insights.lowStock.map(product => (
                  <div key={product.id} className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm truncate max-w-[150px]">{product.name}</span>
                    <span className="text-sm font-medium text-red-500">
                      {product.quantity}/{product.threshold}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expiring Soon */}
          <div>
            <h3 className="text-sm font-medium mb-3">Expiring Soon</h3>
            {insights.loading ? (
              <div className="h-[150px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {insights.expiringItems.map(product => (
                  <div key={product.id} className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm truncate max-w-[150px]">{product.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-amber-500 block">
                        {formatDate(product.expiryDate)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryInsights;