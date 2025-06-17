import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVendor } from '@/context/VendorContext';

const VendorSelector = () => {
  const { vendors, selectedVendor, handleVendorChange, loading } = useVendor();

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Loading vendors..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select
      value={selectedVendor}
      onValueChange={handleVendorChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select vendor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Vendors</SelectItem>
        {vendors.map((vendor) => (
          <SelectItem key={vendor.id} value={vendor.id.toString()}>
            {vendor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VendorSelector;