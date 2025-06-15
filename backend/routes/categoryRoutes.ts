import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// GET /api/categories - Get all categories
router.get('/', getCategories as express.RequestHandler);

// POST /api/categories - Create a new category
router.post('/', createCategory as express.RequestHandler);

// PUT /api/categories/:id - Update a category
router.put('/:id', updateCategory as express.RequestHandler);

// DELETE /api/categories/:id - Delete a category
router.delete('/:id', deleteCategory as express.RequestHandler);

export default router;