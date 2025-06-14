// backend/controllers/categoryController.ts
import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware';
import Category from '../models/Category.sequelize';
import { getCache, setCache, clearCache } from '../utils/cacheUtils';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const cacheKey = `categories-${vendorId}`;
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    const categories = await Category.findAll({
      where: { vendor_id: vendorId }
    });
    
    setCache(cacheKey, categories);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const vendorId = (req as CustomRequest).user?.vendor_id;
    
    if (!vendorId) {
      res.status(401).json({ message: 'Vendor ID not found in token' });
      return;
    }
    
    const category = await Category.create({
      name,
      description,
      vendor_id: vendorId
    });
    
    clearCache(`categories-${vendorId}`);
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};
