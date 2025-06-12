import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Store, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useVendor } from '@/context/VendorContext';

const VendorsPage = () => {
  const { vendors, addVendor, updateVendor, currentVendor, changeVendor } = useVendor();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gstin: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = async () => {
    try {
      if (!formData.name) {
        toast({
          title: "Error",
          description: "Vendor name is required",
          variant: "destructive"
        });
        return;
      }

      await addVendor(formData);
      toast({
        title: "Success",
        description: "Vendor added successfully"
      });
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add vendor",
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (vendor) => {
    setVendorToEdit(vendor);
    setFormData({
      name: vendor.name,
      address: vendor.address || '',
      phone: vendor.phone || '',
      email: vendor.email || '',
      gstin: vendor.gstin || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateVendor = async () => {
    try {
      if (!formData.name) {
        toast({
          title: "Error",
          description: "Vendor name is required",
          variant: "destructive"
        });
        return;
      }

      await updateVendor(vendorToEdit.id, formData);
      toast({
        title: "Success",
        description: "Vendor updated successfully"
      });
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      gstin: ''
    });
    setVendorToEdit(null);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Vendor Management</h1>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground focus-ring shadow-lg shadow-primary/20"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" /> Add New Vendor
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <Card 
            key={vendor.id} 
            className={`card-glassmorphism card-hover ${currentVendor?.id === vendor.id ? 'border-primary' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Store className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => handleEditClick(vendor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {vendor.address && (
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Address:</span> {vendor.address}
                  </p>
                )}
                {vendor.phone && (
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Phone:</span> {vendor.phone}
                  </p>
                )}
                {vendor.email && (
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Email:</span> {vendor.email}
                  </p>
                )}
                {vendor.gstin && (
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">GSTIN:</span> {vendor.gstin}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <Button 
                  variant={currentVendor?.id === vendor.id ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => changeVendor(vendor)}
                >
                  {currentVendor?.id === vendor.id ? "Current Vendor" : "Switch to this Vendor"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Vendor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name *</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter vendor name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Enter address" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="Enter phone number" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter email" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input 
                id="gstin" 
                name="gstin" 
                value={formData.gstin} 
                onChange={handleInputChange} 
                placeholder="Enter GSTIN" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddVendor}>Add Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Vendor Name *</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter vendor name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input 
                id="edit-address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Enter address" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input 
                  id="edit-phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="Enter phone number" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter email" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-gstin">GSTIN</Label>
              <Input 
                id="edit-gstin" 
                name="gstin" 
                value={formData.gstin} 
                onChange={handleInputChange} 
                placeholder="Enter GSTIN" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateVendor}>Update Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default VendorsPage;