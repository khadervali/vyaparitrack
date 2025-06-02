import express from 'express';
const router = express.Router();
import { signupUser, loginUser } from '../controllers/authController';

// POST /api/auth/signup
router.post('/signup', signupUser);

// POST /api/auth/login
router.post('/login', loginUser);

export default router;