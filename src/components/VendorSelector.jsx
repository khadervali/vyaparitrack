import React, { useState } from 'react';
import { Check, ChevronsUpDown, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { useVendor } from '@/context/VendorContext';

const VendorSelector = ({ onVendorChange }) => {
  const [open, setOpen] = useState(false);
  const { vendors, currentVendor, changeVendor, loading } = useVendor();
  const { toast } = useToast();

  const handleVendorSelect = (vendor) => {
    changeVendor(vendor);
    setOpen(false);
    
    // Notify parent component if needed
    if (onVendorChange) {
      onVendorChange(vendor);
    }
    
    toast({
      title: "Vendor Changed",
      description: `Now viewing ${vendor.name}`
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center">
            <Store className="mr-2 h-4 w-4" />
            {currentVendor ? currentVendor.name : "Select vendor..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search vendor..." />
          <CommandEmpty>No vendor found.</CommandEmpty>
          <CommandGroup>
            {vendors.map((vendor) => (
              <CommandItem
                key={vendor.id}
                value={vendor.name}
                onSelect={() => handleVendorSelect(vendor)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentVendor?.id === vendor.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {vendor.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default VendorSelector;