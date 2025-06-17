import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user and file
export interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
    vendor_id?: string;
  };
  file?: Express.Multer.File;
}

// Protect routes - verify token
export const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // For development, just pass through
    req.user = { id: '1', role: 'Vendor Admin', vendor_id: '1' };
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
};