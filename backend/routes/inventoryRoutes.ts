import express, { RequestHandler } from 'express';
import { transferStock, stockIn, stockOut } from '../controllers/inventoryController';

const router = express.Router();

// POST /api/inventory/transfer - Transfer stock between branches
router.post('/transfer', transferStock as RequestHandler);

// POST /api/inventory/stock-in - Record stock addition
router.post('/stock-in', stockIn as RequestHandler);

// POST /api/inventory/stock-out - Record stock removal
router.post('/stock-out', stockOut as RequestHandler);

export default router;