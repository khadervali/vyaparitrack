import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { Search, Plus, Package } from "lucide-react";

const PurchasesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewPurchaseDialogOpen, setIsNewPurchaseDialogOpen] = useState(false);

  // Fetch purchases data
  const { data: purchases, isLoading, error } = useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const response = await api.get("/purchases");
      return response.data;
    },
  });

  // Filter purchases based on search query
  const filteredPurchases = purchases?.filter((purchase) =>
    purchase.purchaseOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.supplier?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle new purchase creation
  const handleNewPurchase = async (purchaseData) => {
    try {
      await api.post("/purchases", purchaseData);
      toast({
        title: "Success",
        description: "New purchase order created successfully",
      });
      setIsNewPurchaseDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create purchase order. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle purchase receipt
  const handleReceivePurchase = async (purchaseId) => {
    try {
      await api.post(`/purchases/${purchaseId}/receive`);
      toast({
        title: "Success",
        description: "Purchase order marked as received",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to receive purchase order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-destructive">Error loading purchase orders</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchase Orders</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search purchase orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Dialog open={isNewPurchaseDialogOpen} onOpenChange={setIsNewPurchaseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Purchase Order</DialogTitle>
              </DialogHeader>
              {/* Add your purchase order form here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases?.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.purchaseOrderNumber}</TableCell>
                <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                <TableCell>{purchase.supplier?.name}</TableCell>
                <TableCell>{purchase.items.length} items</TableCell>
                <TableCell>₹{purchase.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    purchase.status === 'received' ? 'bg-green-100 text-green-800' :
                    purchase.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    purchase.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {purchase.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {purchase.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReceivePurchase(purchase.id)}
                      >
                        Receive
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredPurchases?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No purchase orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchasesPage; 