import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: {
    id: number;
    role: string;
    vendor_id?: number;
  };
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
      id: decoded.user.id,
      role: decoded.user.role,
      vendor_id: decoded.user.vendor_id // Changed from vendorId to vendor_id
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};