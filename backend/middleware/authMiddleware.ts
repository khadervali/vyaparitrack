import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: {
    id: number;
    role: string;
    vendor_id?: number;
  };
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  // Ensure JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    res.status(500).json({ message: 'Internal server error: JWT secret not configured.' });
 return;
  }
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
 return;
    }

    if (typeof jwtSecret === 'string') {
 const decoded = jwt.verify(token, jwtSecret) as any;
    req.user = {
      id: decoded.user.id,
      role: decoded.user.role, // Changed from vendorId to vendor_id
      vendor_id: decoded.user.vendor_id // Changed from vendorId to vendor_id
    };

    next();
    } else {
      // This case should ideally not be reached due to the initial check, but good for type safety
      res.status(500).json({ message: 'Internal server error: JWT secret is not a string.' });
 return;
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};