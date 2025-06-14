import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/lib/api';

// Simple line chart component using SVG
const SimpleLineChart = ({ data, color = "#4f46e5" }) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-[120px] w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {data.map((d, i) => (
          i % Math.ceil(data.length / 5) === 0 ? <span key={i}>{d.label}</span> : null
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    sales: [],
    revenue: [],
    inventory: [],
    loading: true
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setAnalyticsData(prev => ({ ...prev, loading: true }));
        const response = await api.get(`/api/analytics?timeframe=${timeframe}`);
        setAnalyticsData({
          sales: response.data.sales || [],
          revenue: response.data.revenue || [],
          inventory: response.data.inventory || [],
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Use mock data when API fails
        setAnalyticsData({
          sales: generateMockData(timeframe, 'sales'),
          revenue: generateMockData(timeframe, 'revenue'),
          inventory: generateMockData(timeframe, 'inventory'),
          loading: false
        });
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  // Generate mock data for development
  const generateMockData = (timeframe, type) => {
    const points = timeframe === 'day' ? 24 : timeframe === 'week' ? 7 : 30;
    const baseValue = type === 'sales' ? 100 : type === 'revenue' ? 5000 : 200;
    
    return Array.from({ length: points }, (_, i) => {
      const randomFactor = 0.8 + Math.random() * 0.4;
      const value = Math.round(baseValue * randomFactor);
      const label = timeframe === 'day' ? `${i}h` : 
                   timeframe === 'week' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i] : 
                   `${i+1}`;
      return { value, label };
    });
  };

  return (
    <Card className="card-glassmorphism">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Business Analytics</CardTitle>
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger 
                value="day" 
                onClick={() => setTimeframe('day')}
              >
                Day
              </TabsTrigger>
              <TabsTrigger 
                value="week" 
                onClick={() => setTimeframe('week')}
              >
                Week
              </TabsTrigger>
              <TabsTrigger 
                value="month" 
                onClick={() => setTimeframe('month')}
              >
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Sales Trend</h3>
            {analyticsData.loading ? (
              <div className="h-[120px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <SimpleLineChart data={analyticsData.sales} color="#4f46e5" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Revenue</h3>
            {analyticsData.loading ? (
              <div className="h-[120px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <SimpleLineChart data={analyticsData.revenue} color="#10b981" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Inventory Levels</h3>
            {analyticsData.loading ? (
              <div className="h-[120px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <SimpleLineChart data={analyticsData.inventory} color="#f59e0b" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;