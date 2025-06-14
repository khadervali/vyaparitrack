import express, { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// GET /api/products - Get all products
router.get('/', getProducts);

// POST /api/products - Create a new product
router.post('/', createProduct);

// GET /api/products/:id - Get a single product
router.get('/:id', getProductById);

// PUT /api/products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', deleteProduct);

export default router;