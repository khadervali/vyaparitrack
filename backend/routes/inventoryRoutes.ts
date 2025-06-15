// backend/routes/inventoryRoutes.ts
import express, { Router } from 'express';
import { getInventory, getLowStockItems, adjustStock } from '../controllers/inventoryController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// GET /api/inventory - Get all inventory items
router.get('/', getInventory as express.RequestHandler);
// GET /api/inventory/low-stock - Get low stock items
router.get('/low-stock', getLowStockItems as express.RequestHandler);

// POST /api/inventory/adjust-stock - Adjust stock (increase or decrease)
router.post('/adjust-stock', adjustStock as express.RequestHandler);

export default router;
