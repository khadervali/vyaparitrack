import express, { Router } from 'express';
import { getInventoryStats } from '../controllers/inventoryController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// GET /api/inventory/stats - Get inventory statistics
router.get('/stats', getInventoryStats);

export default router;