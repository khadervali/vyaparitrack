import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Role from '../models/Role';

// @desc    Get all roles
// @route   GET /api/auth/roles
// @access  Public
export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error: any) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signupUser = async (req: Request, res: Response): Promise<void> => {
  console.log('Received signup request:', {
    body: { ...req.body, password: '***hidden***' },
    headers: req.headers
  });
  
  const { username, email, password, role } = req.body;

  try {
    // Check if user with the same email already exists    
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // For simplicity, use hardcoded roles if Role table is not set up yet
    const allowedRoles = ['Super Admin', 'Vendor Admin', 'Vendor Staff', 'Inventory Manager'];
    
    if (!allowedRoles.includes(role)) {
      res.status(400).json({ message: 'Invalid user role' });
      return;
    }

    // Find or create the role
    let roleObject = await Role.findOne({ where: { name: role } });
    
    if (!roleObject) {
      // Create the role if it doesn't exist
      roleObject = await Role.create({ name: role });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password and role_id
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role_id: roleObject.id,
      is_active: true
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: role
      }
    });

  } catch (err: any) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  console.log('Login attempt:', {
    body: { ...req.body, password: '***hidden***' },
    headers: req.headers
  });

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }]
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Get role name
    const role = user.Role ? user.Role.name : 'Unknown Role';

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: role
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET || 'vyaparitrack-default-secret';

    jwt.sign(
      payload, 
      JWT_SECRET, 
      { expiresIn: '24h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: role
          }
        });
      }
    );
  } catch (err: any) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};