import express, { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct, // Added updateProduct
  deleteProduct,
  addStock,
  removeStock,
} from '../controllers/productController';
const router = Router();

router.get('/api/products', getAllProducts);
router.post('/api/products', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct); // Consider using PATCH for partial updates like stock
router.delete('/:id', deleteProduct);

router.post('/:id/stock/in', addStock);
router.post('/:id/stock/out', removeStock);

export default router;