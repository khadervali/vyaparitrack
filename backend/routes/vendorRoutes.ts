import express, { Router } from 'express';
import { 
  createVendor, 
  getVendors, 
  getVendor, 
  updateVendor
} from '../controllers/vendorController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// Vendor routes
router.post('/', createVendor);
router.get('/', getVendors);
router.get('/:id', getVendor);
router.put('/:id', updateVendor);
// router.post('/:id/users', addUserToVendor); // Removed temporarily

export default router;