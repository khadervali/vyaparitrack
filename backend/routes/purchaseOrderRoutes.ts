import express from 'express';
import {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from '../controllers/purchaseOrderController';

const router = express.Router();

// @desc    Get all purchase orders
// @route   GET /api/purchaseorders
// @access  Private (Vendor Admin, Vendor Staff with permissions)
router.get('/', getPurchaseOrders);

// @desc    Get single purchase order by ID
// @route   GET /api/purchaseorders/:id
// @access  Private (Vendor Admin, Vendor Staff with permissions)
router.get('/:id', getPurchaseOrderById);

// @desc    Create new purchase order
// @route   POST /api/purchaseorders
// @access  Private (Vendor Admin, Vendor Staff with permissions)
router.post('/', createPurchaseOrder);

// @desc    Update purchase order by ID
// @route   PUT /api/purchaseorders/:id
// @access  Private (Vendor Admin, Vendor Staff with permissions)
router.put('/:id', updatePurchaseOrder);

// @desc    Delete purchase order by ID
// @route   DELETE /api/purchaseorders/:id
// @access  Private (Vendor Admin, Vendor Staff with permissions)
router.delete('/:id', deletePurchaseOrder);

export default router;