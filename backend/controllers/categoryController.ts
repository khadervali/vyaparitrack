import { Request, Response } from 'express';
import Category from '../models/Category.sequelize';
import { CustomRequest } from '../middleware/authMiddleware';

// Get all categories for a vendor
export const getCategories = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;
    
    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const categories = await Category.findAll({
      where: { vendorId },
      order: [['name', 'ASC']]
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// Create a new category
export const createCategory = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;
    const { name, description } = req.body;
    
    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }
    
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category already exists for this vendor
    const existingCategory = await Category.findOne({
      where: { 
        name,
        vendorId
      }
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = await Category.create({
      name,
      description,
      vendorId
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({
      name,
      description
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category' });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};