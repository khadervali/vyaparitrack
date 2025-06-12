import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Vendor from '../models/Vendor.sequelize'; // Using Sequelize model

// @desc    Get all vendors for the current user
// @route   GET /api/vendors
// @access  Private
export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await Vendor.findAll({
      attributes: ['id', 'name', 'address', 'phone', 'email', 'gstin']
    });
    
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Failed to fetch vendors' });
  }
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