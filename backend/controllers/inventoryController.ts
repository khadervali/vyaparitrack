import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Product from '../models/Product.sequelize';
import { getCache, setCache, clearCache } from '../utils/cacheUtils';

// @desc    Adjust stock (increase or decrease)
// @route   POST /api/inventory/adjust-stock
// @access  Private
export const adjustStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity, adjustmentType } = req.body;
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    // Find the product
    const product = await Product.findOne({
      where: {
        id: productId,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // Calculate new stock quantity
    let newQuantity = product.quantity || 0;
    if (adjustmentType === 'stock-in') {
      newQuantity += parseInt(quantity);
    } else if (adjustmentType === 'stock-out') {
      newQuantity -= parseInt(quantity);
      if (newQuantity < 0) {
        res.status(400).json({ message: 'Insufficient stock' });
        return;
      }
    }
    
    // Update product quantity
    await product.update({ quantity: newQuantity });
    
    // Clear product cache
    clearCache(`products-${vendorId}`);
    clearCache(`product-${productId}`);
    
    res.json({ 
      message: 'Stock adjusted successfully',
      product: {
        id: product.id,
        name: product.name,
        quantity: newQuantity
      }
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({ message: 'Failed to adjust stock' });
  }
};

// @desc    Get low stock products
// @route   GET /api/inventory/low-stock
// @access  Private
export const getLowStockProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const cacheKey = `low-stock-${vendorId}`;
    
    // Check cache first
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    // Find products with quantity below minStockQuantity
    const products = await Product.findAll({
      where: {
        vendor_id: vendorId,
        type: 'product'
      }
    });
    
    // Filter products with low stock
    const lowStockProducts = products.filter(product => {
      const quantity = product.quantity || 0;
      const minQuantity = product.minStockQuantity || 5; // Default min stock is 5
      return quantity <= minQuantity;
    });
    
    // Store in cache
    setCache(cacheKey, lowStockProducts);
    
    res.json(lowStockProducts);
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    res.status(500).json({ message: 'Failed to fetch low stock products' });
  }
};

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
    
    const cacheKey = `inventory-stats-${vendorId}`;
    
    // Check cache first
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    // Get all products for this vendor
    const products = await Product.findAll({
      where: {
        vendor_id: vendorId
      }
    });
    
    // Calculate statistics
    const totalProducts = products.filter(p => p.type === 'product').length;
    const totalServices = products.filter(p => p.type === 'service').length;
    
    // Count low stock items
    const lowStockItems = products.filter(product => {
      if (product.type !== 'product') return false;
      const quantity = product.quantity || 0;
      const minQuantity = product.minStockQuantity || 5;
      return quantity <= minQuantity && quantity > 0;
    }).length;
    
    // Count out of stock items
    const outOfStockItems = products.filter(product => {
      if (product.type !== 'product') return false;
      const quantity = product.quantity || 0;
      return quantity === 0;
    }).length;
    
    const stats = {
      totalProducts,
      totalServices,
      lowStockItems,
      outOfStockItems
    };
    
    // Store in cache
    setCache(cacheKey, stats);
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching inventory stats:', error);
    res.status(500).json({ message: 'Failed to fetch inventory statistics' });
  }
};