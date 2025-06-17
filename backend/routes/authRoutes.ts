import express, { Router } from 'express';
import { 
  signupUser, 
  loginUser, 
  getRoles, 
  getMe,
  updateProfile,
  changePassword,
  updateCompany,
  getSettings,
  updateSettings,
  uploadAvatar
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router: Router = express.Router();

// GET /api/auth/roles - Get all roles
router.get('/roles', getRoles);

// POST /api/auth/signup - Register a new user
router.post('/signup', signupUser);

// POST /api/auth/login - Authenticate user & get token
router.post('/login', loginUser);

// GET /api/auth/me - Get current user
router.get('/me', protect, getMe);

// User Profile Routes
router.put('/users/profile', protect, updateProfile);
router.put('/users/password', protect, changePassword);
router.put('/users/company', protect, updateCompany);
router.get('/users/settings', protect, getSettings);
router.put('/users/settings', protect, updateSettings);
router.post('/users/avatar', protect, upload.single('avatar'), uploadAvatar);

export default router;