import express, { Router } from 'express';
import { 
  getBranchInventory, 
  addStock, 
  removeStock, 
  transferStock, 
  getTransactionHistory 
} from '../controllers/inventoryController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Get inventory transaction history
router.get('/transactions', getTransactionHistory);

// Get inventory for a specific branch
router.get('/:branchId', getBranchInventory);

// Add stock to inventory
router.post('/stock-in', addStock);

// Remove stock from inventory
router.post('/stock-out', removeStock);

// Transfer stock between branches
router.post('/transfer', transferStock);

export default router;