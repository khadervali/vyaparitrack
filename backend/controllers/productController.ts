import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Product from '../models/Product.sequelize';
import { getCache, setCache, clearCache } from '../utils/cacheUtils';
import { Op } from 'sequelize';

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    const searchTerm = req.query.searchTerm as string;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    // Create cache key with search parameters
    const cacheKey = `products-${vendorId}${searchTerm ? '-' + searchTerm : ''}`;
    
    // Check cache first
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    // Build query
    const whereClause: any = { vendor_id: vendorId };
    if (searchTerm) {
      whereClause.name = { [Op.like]: `%${searchTerm}%` };
    }
    
    // Fetch from database
    const products = await Product.findAll({ where: whereClause });
    
    // Store in cache
    setCache(cacheKey, products);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const cacheKey = `product-${productId}`;
    
    // Check cache first
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
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
    
    // Store in cache
    setCache(cacheKey, product);
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.create({
      ...req.body,
      vendor_id: vendorId
    });
    
    // Clear products cache for this vendor
    clearCache(`products-${vendorId}`);
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
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
    
    await product.update(req.body);
    
    // Clear caches
    clearCache(`products-${vendorId}`);
    clearCache(`product-${productId}`);
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
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
    
    await product.destroy();
    
    // Clear caches
    clearCache(`products-${vendorId}`);
    clearCache(`product-${productId}`);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};