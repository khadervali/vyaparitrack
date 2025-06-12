import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Product from '../models/Product.sequelize';

// @desc    Get inventory statistics
// @route   GET /api/inventory/stats
// @access  Private
export const getInventoryStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    // Get all products for the vendor
    const products = await Product.findAll({ 
      where: { vendor_id: vendorId }
    });
    
    // Calculate statistics - using hardcoded values for now
    const totalProducts = products.length;
    const totalServices = 0;
    
    // For low stock and out of stock, we would need inventory data
    // This is a simplified version that assumes products have initialStock property
    // In a real app, you'd query your inventory collection
    const lowStockItems = 2; // Placeholder
    const outOfStockItems = 1; // Placeholder
    
    res.json({
      totalProducts,
      totalServices,
      lowStockItems,
      outOfStockItems
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};