import express, { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addStock,
  removeStock,
  getAllProducts
} from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// GET /api/products - Get all products
router.get('/', getProducts);

// GET /api/products/all - Get all products for vendor
router.get('/all', getAllProducts);

// POST /api/products - Create a new product
router.post('/', createProduct);

// GET /api/products/:id - Get a single product
router.get('/:id', getProduct);

// PUT /api/products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', deleteProduct);

// POST /api/products/:id/stock - Add stock to a product
router.post('/:id/stock', addStock);

// POST /api/products/:id/remove-stock - Remove stock from a product
router.post('/:id/remove-stock', removeStock);

export default router;