import { Request, Response, NextFunction, RequestHandler } from 'express';
import Product from '../models/Product.sequelize';
import Inventory from '../models/Inventory.sequelize';
import { Op } from 'sequelize';
import { CustomRequest } from '../middleware/authMiddleware';


// @desc    Add new product
// @route   POST /api/products
// @access  Private (Vendor Admin, Vendor Staff with permissions)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      sku,
      category,
      purchasePrice,
      salePrice,
      initialStock,
      hsnSac,
      description,
      price,
      taxRate,
    } = req.body;

    // Basic validation (you can add more comprehensive validation)
    if (!name || !sku || !category || purchasePrice === undefined || salePrice === undefined || initialStock === undefined) {
      res.status(400).json({ message: 'Please provide all required product details.' });
      return;
    }

    const product = await Product.create({
      name,
      description,
      price,
      sku,
      category, 
      purchasePrice,
      salePrice,
      hsnSac,
      taxRate,
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

export const getProducts = async (req: Request, res: Response): Promise<void> => {
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

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
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

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
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

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
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

export const addStock = async (req: Request, res: Response): Promise<void> => {
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

export const removeStock = async (req: Request, res: Response): Promise<void> => {
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

export const getAllProducts = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    let where = {};
    
    if (req.user?.role !== 'Super Admin') {
      if (!req.user?.vendor_id) {
        res.status(400).json({ message: 'Vendor ID is required' });
        return;
      }
      where = { vendor_id: req.user.vendor_id };
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};