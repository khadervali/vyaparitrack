const express = require('express');
const {
  addProduct,
  getProducts,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addStock,
  removeStock,
} = require('../controllers/productController');
const router = express.Router();

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/api/products', getAllProducts);
router.post('/api/products', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct); // Consider using PATCH for partial updates like stock
router.delete('/:id', deleteProduct);

router.post('/:id/stock/in', addStock);
router.post('/:id/stock/out', removeStock);

export default router;

module.exports = router;