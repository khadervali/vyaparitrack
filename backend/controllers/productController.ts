import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Product from '../models/Product.sequelize';
import Category from '../models/Category.sequelize';
import sequelize from '../config/database';
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
    
    // Fetch from database with category information
    const products = await Product.findAll({ 
      where: whereClause,
      include: [
        { 
          model: Category, 
          as: 'category',
          attributes: ['id', 'name', 'description'] 
        }
      ]
    });
    
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
      },
      include: [
        { 
          model: Category, 
          as: 'category',
          attributes: ['id', 'name', 'description'] 
        }
      ]
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
    
    // Use category_id directly
    let productData = { ...req.body, vendor_id: vendorId };
    
    // Ensure category_id is properly set as a number
    if (productData.category_id) {
      productData.category_id = Number(productData.category_id);
    }
    
    // Create product first
    const product = await Product.create(productData);
    
    // Then directly update the category_id in the database
    if (productData.category_id) {
      try {
        // Try with category_id
        await sequelize.query(
          'UPDATE products SET category_id = ? WHERE id = ?',
          {
            replacements: [productData.category_id, product.id],
            type: sequelize.QueryTypes.UPDATE
          }
        );
        
        // Also try with categoryId
        await sequelize.query(
          'UPDATE products SET categoryId = ? WHERE id = ?',
          {
            replacements: [productData.category_id, product.id],
            type: sequelize.QueryTypes.UPDATE
          }
        );
      } catch (error) {
        console.error('Error updating category_id:', error);
      }
    }
    
    // Clear products cache for this vendor
    clearCache(`products-${vendorId}`);
    
    // Fetch the created product with category information
    const createdProduct = await Product.findOne({
      where: {
        id: product.id,
        vendor_id: vendorId
      },
      include: [
        { 
          model: Category, 
          as: 'category',
          attributes: ['id', 'name', 'description'] 
        }
      ]
    });
    
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  debugger;
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

    // Use update data directly
    let updateData = { ...req.body };
    
    // Update all fields including category_id
    await product.update({
      ...updateData,
      categoryId: updateData.category_id // Try both field names
    });
    
    // Force update directly in the database to ensure category_id is set
    if (updateData.category_id) {
      try {
        // Try with category_id
        await sequelize.query(
          'UPDATE products SET category_id = ? WHERE id = ?',
          {
            replacements: [updateData.category_id, productId],
            type: sequelize.QueryTypes.UPDATE
          }
        );
        
        // Also try with categoryId
        await sequelize.query(
          'UPDATE products SET categoryId = ? WHERE id = ?',
          {
            replacements: [updateData.category_id, productId],
            type: sequelize.QueryTypes.UPDATE
          }
        );
      } catch (error) {
        console.error('Error updating category_id:', error);
      }
    }
    
    // Clear caches
    clearCache(`products-${vendorId}`);
    clearCache(`product-${productId}`);
    
    // Fetch the updated product with category information
    const updatedProduct = await Product.findOne({
      where: {
        id: productId,
        vendor_id: vendorId
      },
      include: [
        { 
          model: Category, 
          as: 'category',
          attributes: ['id', 'name', 'description'] 
        }
      ]
    });
    
    res.json(updatedProduct);
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