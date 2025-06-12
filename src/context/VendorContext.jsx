import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

// Create the context
const VendorContext = createContext(null);

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const apiCallInProgress = useRef(false);
  const initialLoadDone = useRef(false);

  const fetchVendors = async () => {
    // Prevent duplicate API calls
    if (apiCallInProgress.current) return;
    
    apiCallInProgress.current = true;
    try {
      console.log('Fetching vendors...');
      const response = await api.get('/vendors');
      setVendors(response.data);
      
      // Set the first vendor as current if none is selected
      if (!currentVendor && response.data.length > 0) {
        setCurrentVendor(response.data[0]);
        localStorage.setItem('currentVendor', JSON.stringify(response.data[0]));
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      // Use hardcoded vendors as fallback
      const fallbackVendors = [
        {
          id: 1,
          name: "ABC Electronics",
          address: "123 Main St",
          phone: "555-1234",
          email: "abc@example.com",
          gstin: "GST123456789"
        },
        {
          id: 2,
          name: "XYZ Supplies",
          address: "456 Oak Ave",
          phone: "555-5678",
          email: "xyz@example.com",
          gstin: "GST987654321"
        }
      ];
      setVendors(fallbackVendors);
      
      if (!currentVendor) {
        setCurrentVendor(fallbackVendors[0]);
        localStorage.setItem('currentVendor', JSON.stringify(fallbackVendors[0]));
      }
      
      toast({
        title: 'Warning',
        description: 'Using demo data - could not connect to server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      apiCallInProgress.current = false;
    }
  };

  const changeVendor = (vendor) => {
    setCurrentVendor(vendor);
    localStorage.setItem('currentVendor', JSON.stringify(vendor));
  };

  useEffect(() => {
    // Only load once
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    
    // Try to get the current vendor from localStorage
    const savedVendor = localStorage.getItem('currentVendor');
    if (savedVendor) {
      try {
        setCurrentVendor(JSON.parse(savedVendor));
      } catch (e) {
        console.error('Error parsing saved vendor:', e);
      }
    }
    
    // Fetch vendors
    fetchVendors();
  }, []);

  // Create the context value
  const contextValue = {
    vendors,
    currentVendor,
    loading,
    changeVendor,
    fetchVendors
  };

  return (
    <VendorContext.Provider value={contextValue}>
      {children}
    </VendorContext.Provider>
  );
};

// Custom hook to use the vendor context
export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};

export default VendorContext;