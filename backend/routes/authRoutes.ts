import express, { Router } from 'express';
import { signupUser, loginUser, getRoles } from '../controllers/authController';

const router: Router = express.Router();

// GET /api/auth/roles - Get all roles
router.get('/roles', getRoles);

// POST /api/auth/signup - Register a new user
router.post('/signup', signupUser);

// POST /api/auth/login - Authenticate user & get token
router.post('/login', loginUser);

export default router;