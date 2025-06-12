import React from 'react';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVendor } from '@/context/VendorContext';

const SimpleVendorSelector = ({ onVendorChange }) => {
  const { vendors, currentVendor, changeVendor } = useVendor();

  const handleVendorChange = (e) => {
    const vendorId = parseInt(e.target.value);
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      changeVendor(vendor);
      if (onVendorChange) {
        onVendorChange(vendor);
      }
    }
  };

  return (
    <div className="flex items-center">
      <Store className="mr-2 h-4 w-4 text-primary" />
      <select 
        value={currentVendor?.id || ''}
        onChange={handleVendorChange}
        className="bg-transparent border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {vendors.length === 0 && (
          <option value="" disabled>No vendors available</option>
        )}
        {vendors.map(vendor => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SimpleVendorSelector;