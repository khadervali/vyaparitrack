// backend/routes/categoryRoutes.ts
import express, { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.use(protect);
router.get('/', getCategories);
router.post('/', createCategory);

export default router;
