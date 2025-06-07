import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.sequelize';
import Inventory from '../models/Inventory.sequelize';
import { Op } from 'sequelize';
import { CustomRequest } from '../middleware/authMiddleware'; // Import CustomRequest

// @desc    Add new product
// @route   POST /api/products
// @access  Private (Vendor Admin, Vendor Staff with permissions)
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      name,
      sku,
      category,
      purchasePrice,
      salePrice,
      initialStock,
      hsnSac,
      description, // Add description to destructuring
      price, // Add price to destructuring
      taxRate,
    } = req.body;

    // Basic validation (you can add more comprehensive validation)
    if (!name || !sku || !category || purchasePrice === undefined || salePrice === undefined || initialStock === undefined) {
      res.status(400).json({ message: 'Please provide all required product details.' });
    }

    // Check if product with the same SKU already exists for this vendor (assuming vendor is handled by middleware/auth)
    // const existingProduct = await Product.findOne({ sku });
    // if (existingProduct) {
    //   return res.status(400).json({ message: 'Product with this SKU already exists.' });
    // }

    const product = await Product.create({
      name,
      description,
      price,
      // We are not storing quantity directly in Product anymore,
      // it will be managed in Inventory per branch.
      sku,
      category,
      purchasePrice,
      salePrice,
      hsnSac,
      taxRate,
      // Add vendor ID from authenticated user if multi-tenancy is implemented
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

export const addStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByPk(req.params.id);
    const { branchId } = req.body;
    if (!branchId || quantity === undefined) {
      res.status(400).json({ message: 'Branch ID and quantity are required' });
      return;
    }
    if (product) {
      let inventory = await Inventory.findOne({ where: { productId: req.params.id, branchId } });
      if (!inventory) {
        inventory = await Inventory.create({ productId: req.params.id, branchId, stockQuantity: 0 });
      }
      const newStock = (inventory.get('stockQuantity') as number) + Number(quantity);
      inventory.set('stockQuantity', newStock);
      await inventory.save();
      res.json(inventory);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const removeStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { quantity } = req.body;
    const { branchId } = req.body;
    if (!branchId || quantity === undefined) {
      res.status(400).json({ message: 'Branch ID and quantity are required' });
      return;
    }
    const inventory = await Inventory.findOne({ where: { productId: req.params.id, branchId } });
    if (inventory) {
      const newStock = Math.max(0, (inventory.get('stockQuantity') as number) - Number(quantity));
      inventory.set('stockQuantity', newStock);
      await inventory.save();
      const product = await Product.findByPk(req.params.id);
      if (product && newStock < (product.get('minStockQuantity') as number)) {
        // TODO: Trigger low stock alert for this product in this branch
      }
      res.json(inventory);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getAllProducts = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.vendorId) {
      res.status(400).json({ message: 'Vendor ID is required' });
      return;
    }
    const products = await Product.findAll({ where: { vendor: req.user.vendorId } });
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// The following functions were likely intended for a different ORM (Mongoose) based on the find/findById/deleteOne usage.
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { searchTerm, filters } = req.query;
    let query: Record<string, any> = {};

    // Basic search functionality
    if (searchTerm) {
      query = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } }, // Case-insensitive search by name
          { description: { [Op.like]: `%${searchTerm}%` } }, // Case-insensitive search by description
          { sku: { [Op.like]: `%${searchTerm}%` } }, // Case-insensitive search by SKU (if you add SKU to Product model)
          // Add more fields here if needed for searching (e.g., category)
        ],
      };
    }

    // Apply filters
    if (filters && typeof filters === 'object') {
      // Assuming filters is an object like { category: 'Electronics', type: 'product' }
      for (const key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
          query[key] = filters[key];
        }
      }
    }

    const products = await Product.findAll({ where: query });
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      // Add logic to check if the user has access to this product (based on vendor)
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price, quantity, type, stockQuantity, minStockQuantity } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update({
        name,
        description,
        price,
        quantity,
        type,
        stockQuantity,
        minStockQuantity,
      });
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      // Add logic to check if the user has permission to delete this product
      await product.destroy();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};