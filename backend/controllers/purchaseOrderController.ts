import { Request, Response } from 'express';
import PurchaseOrder from '../models/PurchaseOrder';
import PurchaseOrderItem from '../models/PurchaseOrderItem';

// Placeholder controller functions for Purchase Orders

// @desc    Get all purchase orders
// @route   GET /api/purchaseorders
// @access  Private
export const getPurchaseOrders = async (req: Request, res: Response) => {
  try {
    // Placeholder: Return a success message for now
    const purchaseOrders = await PurchaseOrder.find({})
      .populate('supplier', 'name') // Populate supplier name
      .populate({
        path: 'items',
        populate: { path: 'product', select: 'name sku' } // Populate product details within items
      });
 res.status(200).json(purchaseOrders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single purchase order by ID
// @route   GET /api/purchaseorders/:id
// @access  Private
export const getPurchaseOrder = async (req: Request, res: Response) => {
  try {
    // Placeholder: Return the ID from the request params for now
    res.status(200).json({ message: 'Placeholder: Get single purchase order', id: req.params.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new purchase order
// @route   POST /api/purchaseorders
// @access  Private
export const createPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const { supplier, items } = req.body;

    // Basic validation
    if (!supplier || !items || items.length === 0) {
      return res.status(400).json({ message: 'Supplier and at least one item are required to create a purchase order' });
    }

    // Calculate total amount and create PurchaseOrderItem documents
    let totalAmount = 0;
    const purchaseOrderItems = [];

    for (const item of items) {
      const subtotal = item.quantity * item.unitPrice;
      totalAmount += subtotal;

      const newItem = new PurchaseOrderItem({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: subtotal,
      });
      purchaseOrderItems.push(newItem);
    }

    // Create PurchaseOrder document
    const purchaseOrder = new PurchaseOrder({
      supplier,
      items: purchaseOrderItems, // Associate items with the order
      totalAmount,
      // Note: vendor and createdBy should ideally come from authenticated user data
    });

    // Save PO items and the Purchase Order to the database
    await Promise.all(purchaseOrderItems.map(item => item.save()));
    const createdPurchaseOrder = await purchaseOrder.save();

    res.status(201).json(createdPurchaseOrder);
  } catch (error: any) { // Use 'any' for now, consider more specific error handling
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update purchase order by ID
// @route   PUT /api/purchaseorders/:id
// @access  Private
export const updatePurchaseOrder = async (req: Request, res: Response) => {
  try {
    // Placeholder: Return the ID and request body for now
    res.status(200).json({ message: 'Placeholder: Update purchase order', id: req.params.id, body: req.body });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete purchase order by ID
// @route   DELETE /api/purchaseorders/:id
// @access  Private
export const deletePurchaseOrder = async (req: Request, res: Response) => {
  try {
    // Placeholder: Return the ID from the request params for now
    res.status(200).json({ message: 'Placeholder: Delete purchase order', id: req.params.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};