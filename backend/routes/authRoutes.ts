import express from 'express';
const router = express.Router();
import { signupUser, loginUser, getRoles } from '../controllers/authController';

// POST /api/auth/signup
router.post('/signup', signupUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/roles
router.get('/roles', getRoles);

export default router;