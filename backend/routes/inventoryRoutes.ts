import express, { Router } from 'express';
import { 
  adjustStock,
  getLowStockProducts,
  getInventoryStats
} from '../controllers/inventoryController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// Inventory routes
router.post('/adjust-stock', adjustStock);
router.get('/low-stock', getLowStockProducts);
router.get('/stats', getInventoryStats);

export default router;