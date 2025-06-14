import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Vendor from '../models/Vendor.sequelize';
import { getCache, setCache, clearCache } from '../utils/cacheUtils';

// @desc    Get all vendors for the current user
// @route   GET /api/vendors
// @access  Private
export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check cache first
    const cachedData = getCache('vendors');
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    // Fetch from database if not in cache
    const vendors = await Vendor.findAll({
      attributes: ['id', 'name', 'address', 'phone', 'email', 'gstin']
    });
    
    // Store in cache
    setCache('vendors', vendors);
    
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Failed to fetch vendors' });
  }
};

// @desc    Create a new vendor
// @route   POST /api/vendors
// @access  Private
export const createVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, phone, email, gstin } = req.body;
    const userId = (req as CustomRequest).user?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }
    
    const vendor = await Vendor.create({
      name,
      address,
      phone,
      email,
      gstin
    });
    
    // Clear vendors cache
    clearCache('vendors');
    
    res.status(201).json(vendor);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get a single vendor
// @route   GET /api/vendors/:id
// @access  Private
export const getVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = parseInt(req.params.id);
    const cacheKey = `vendor-${vendorId}`;
    
    // Check cache first
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    const vendor = await Vendor.findByPk(vendorId, {
      attributes: ['id', 'name', 'address', 'phone', 'email', 'gstin']
    });
    
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    
    // Store in cache
    setCache(cacheKey, vendor);
    
    res.json(vendor);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Private
export const updateVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = parseInt(req.params.id);
    
    const vendor = await Vendor.findByPk(vendorId);
    
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    
    await vendor.update(req.body);
    
    // Clear caches
    clearCache('vendors');
    clearCache(`vendor-${vendorId}`);
    
    res.json(vendor);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};