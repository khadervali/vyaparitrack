import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Product from '../models/Product.sequelize';  // Using Sequelize model
import { Op } from 'sequelize';

// @desc    Add new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, sku, hsn_sac, gst_rate, category, unitOfMeasurement, type, minStockQuantity, barcode } = req.body;
    
    // Get vendor ID from authenticated user
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.create({
      name,
      description,
      price,
      sku,
      hsn_sac,
      gst_rate,
      category,
      unitOfMeasurement,
      type,
      minStockQuantity,
      barcode,
      vendor_id: vendorId // Use vendor_id instead of vendor
    });
    
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get vendor ID from authenticated user
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const searchTerm = req.query.searchTerm as string;
    let whereClause: any = { vendor_id: vendorId };
    
    // Add search functionality if searchTerm is provided
    if (searchTerm) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { sku: { [Op.like]: `%${searchTerm}%` } },
          { category: { [Op.like]: `%${searchTerm}%` } }
        ]
      };
    }
    
    const products = await Product.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    await product.update(req.body);
    
    // Fetch the updated product
    const updatedProduct = await Product.findByPk(req.params.id);
    
    res.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    await product.destroy();
    res.json({ message: 'Product removed' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Add stock to product
// @route   POST /api/products/:id/stock
// @access  Private
export const addStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // In a real app, you would update your inventory collection
    // This is a simplified version
    res.json({ message: 'Stock added successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Remove stock from product
// @route   POST /api/products/:id/remove-stock
// @access  Private
export const removeStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        vendor_id: vendorId
      }
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // In a real app, you would update your inventory collection
    // This is a simplified version
    res.json({ message: 'Stock removed successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get all products for vendor
// @route   GET /api/products/all
// @access  Private
export const getAllProducts = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const vendorId = req.user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const products = await Product.findAll({
      where: { vendor_id: vendorId },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};