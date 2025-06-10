import express from 'express';
import { Model } from 'sequelize'; // Import Model if still needed for types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../models/user.model'; 
import Role from '../models/Role'; // Import the Role model


export const getRoles = async (req: any, res: any) => {
  try {
    const roles = await Role.findAll(); // Fetch all roles from the database
    res.status(200).json(roles); // Send the roles as a JSON response
  } catch (error: any) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message }); // Handle any errors
  }
};

export const signupUser = async (req: any, res: any) => {
  console.log('Received signup request:', {
    body: { ...req.body, password: '***hidden***' },
    headers: req.headers
  });
  
  const { username, email, password, role } = req.body;

  try {
    // Check if user with the same email already exists    
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser !== null) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate the role against roles from the database
    const roles = await Role.findAll({ attributes: ['name'] }); // Fetch only the role names
    const allowedRoles = roles.map(r => r.name); // Get an array of allowed role names

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    // Find the role object to get its ID
    const roleObject = await Role.findOne({ where: { name: role } });

    // Check if the role was found
 if (!roleObject) {
      // This case should ideally not happen if the previous role validation is correct,
      // but it's good for type safety and robust error handling.
 console.error(`Role with name "${role}" not found after validation.`);
 return res.status(400).json({ message: 'Invalid user role provided.' });
 }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password and role_id
    const newUser = await User.create({
      username,
      email: email, // Explicitly assign email
      password: hashedPassword, // Use the hashed password
      role_id: roleObject.id, // Use roleObject.id instead of role
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
    const user = await User.findOne({ 
      where: { email },
      include: Role // Include the Role model
    }) as User & { Role: Role | null }; // Assert the type to include Role

    if (!user) { // Check if user exists
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
        role: user.Role ? user.Role.name : null, // Access role name from included Role object
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET || 'vyaparitrack-default-secret';

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err: any, token: any) => {
      if (err) { console.error('JWT Sign Error:', err); throw err; }
      res.json({ token });
    });
  } catch (err: any) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};