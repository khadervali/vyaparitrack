import { Model } from 'sequelize';
import Instance  from 'sequelize/types/model';
import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../models/user.model'; 

export const signupUser = async (req: any, res: any) => {
  console.log('Received signup request:', {
    body: { ...req.body, password: '***hidden***' },
    headers: req.headers
  });
  
  const { username, email, password, role } = req.body;

  try {
    // Check if user with the same email already exists    
    const existingUser: Instance<UserAttributes> | null = await User.findOne({ where: { email } });


    if (existingUser !== null) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate the role
    const allowedRoles = ['Super Admin', 'Vendor Admin', 'Vendor Staff', 'Inventory Manager'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser: Instance<UserAttributes> = await User.create({
      username,
      email,
      password: hashedPassword, // Use the hashed password
      role,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err: any) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const loginUser = async (req: any, res: any) => {
  console.log('Login attempt:', {
    body: { ...req.body, password: '***hidden***' },
    headers: req.headers
  });

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user: Instance<UserAttributes> | null = await User.findOne({ where: { email } });


    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.dataValues.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.dataValues.id,
        role: user.dataValues.role,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET || 'vyaparitrack-default-secret';

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err: any, token: any) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err: any) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};