import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';

// @desc    Get all vendors for the current user
// @route   GET /api/vendors
// @access  Private
export const getVendors = (req: Request, res: Response): void => {
  // Return hardcoded vendors
  res.json([
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
    },
    {
      id: 3,
      name: "Global Traders",
      address: "789 Pine Rd",
      phone: "555-9012",
      email: "global@example.com",
      gstin: "GST456789123"
    }
  ]);
};

// @desc    Create a new vendor
// @route   POST /api/vendors
// @access  Private
export const createVendor = (req: Request, res: Response): void => {
  const { name, address, phone, email, gstin } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 1000),
    name,
    address,
    phone,
    email,
    gstin
  });
};

// @desc    Get a single vendor
// @route   GET /api/vendors/:id
// @access  Private
export const getVendor = (req: Request, res: Response): void => {
  const vendorId = parseInt(req.params.id);
  
  res.json({
    id: vendorId,
    name: "Sample Vendor",
    address: "123 Main St",
    phone: "555-1234",
    email: "vendor@example.com",
    gstin: "GST123456789"
  });
};

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Private
export const updateVendor = (req: Request, res: Response): void => {
  const vendorId = parseInt(req.params.id);
  
  res.json({
    id: vendorId,
    ...req.body
  });
};