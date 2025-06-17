import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Role from '../models/Role';
import { CustomRequest } from '../middleware/authMiddleware';

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

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Role }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Get role name and permissions
    const role = user.Role ? user.Role.name : 'Unknown Role';
    const isAdmin = role === 'Super Admin' || role === 'Vendor Admin';

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: role,
      isAdmin: isAdmin,
      phone: user.phone,
      company: user.company,
      gstin: user.gstin,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      avatar: user.avatar,
      timezone: user.timezone,
      date_format: user.date_format,
      currency: user.currency,
      language: user.language,
      email_notifications: user.email_notifications,
      whatsapp_notifications: user.whatsapp_notifications,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/users/profile
// @access  Private
export const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, email, phone, company, role } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Role }]
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if user is trying to change role
    if (role) {
      const currentUserRole = user.Role ? user.Role.name : 'Unknown Role';
      const isAdmin = currentUserRole === 'Super Admin' || currentUserRole === 'Vendor Admin';
      
      if (!isAdmin) {
        res.status(403).json({ message: 'Only administrators can change roles' });
        return;
      }

      // Find the new role
      const newRole = await Role.findOne({ where: { name: role } });
      if (!newRole) {
        res.status(400).json({ message: 'Invalid role' });
        return;
      }

      user.role_id = newRole.id;
    }

    // Update user fields
    if (name) user.username = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (company) user.company = company;

    await user.save();

    // Fetch updated user with role
    const updatedUser = await User.findOne({
      where: { id: userId },
      include: [{ model: Role }],
      attributes: { exclude: ['password'] }
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found after update' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.Role ? updatedUser.Role.name : 'Unknown Role',
        phone: updatedUser.phone,
        company: updatedUser.company,
        gstin: updatedUser.gstin,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        pincode: updatedUser.pincode,
        avatar: updatedUser.avatar,
        timezone: updatedUser.timezone,
        date_format: updatedUser.date_format,
        currency: updatedUser.currency,
        language: updatedUser.language,
        email_notifications: updatedUser.email_notifications,
        whatsapp_notifications: updatedUser.whatsapp_notifications,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        is_active: updatedUser.is_active
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
export const changePassword = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Current password is incorrect' });
      return;
    }

    // Hash and update new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await user.update({ password: hashedPassword });

    res.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update company information
// @route   PUT /api/users/company
// @access  Private
export const updateCompany = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { companyName, gstin, address, city, state, pincode } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update company information
    await user.update({
      company: companyName,
      gstin,
      address,
      city,
      state,
      pincode
    });

    res.json({
      message: 'Company information updated successfully',
      company: {
        companyName: user.company,
        gstin: user.gstin,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      }
    });
  } catch (error: any) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user settings
// @route   GET /api/users/settings
// @access  Private
export const getSettings = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      timezone: user.timezone || 'Asia/Kolkata',
      dateFormat: user.date_format || 'DD-MM-YYYY',
      currency: user.currency || 'INR',
      language: user.language || 'en',
      notifications: {
        email: user.email_notifications || false,
        whatsapp: user.whatsapp_notifications || false
      }
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
export const updateSettings = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { timezone, dateFormat, currency, language, notifications } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update settings
    await user.update({
      timezone,
      date_format: dateFormat,
      currency,
      language,
      email_notifications: notifications?.email || false,
      whatsapp_notifications: notifications?.whatsapp || false
    });

    res.json({
      message: 'Settings updated successfully',
      settings: {
        timezone: user.timezone,
        dateFormat: user.date_format,
        currency: user.currency,
        language: user.language,
        notifications: {
          email: user.email_notifications,
          whatsapp: user.whatsapp_notifications
        }
      }
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Upload profile picture
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const avatarFile = req.file;

    if (!userId) {
      res.status(401).json({ message: 'User ID not found in token' });
      return;
    }

    if (!avatarFile) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update avatar path
    const avatarPath = `/uploads/avatars/${avatarFile.filename}`;
    await user.update({ avatar: avatarPath });

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: avatarPath
    });
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};