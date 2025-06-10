import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
export interface CustomRequest extends Request {
  user?: {
    id: string; // Assuming the user ID is stored in the token payload
    vendor_id: string; // Add vendor_id here
    // Add other user properties from the token payload here
  };
}

const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }; // Assuming the token payload has an 'id' field

      // Attach user to the request
      req.user = { id: decoded.id, vendor_id: (decoded as any).vendor_id }; // Assuming vendor_id is also in the payload

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      next({path: "/login"});
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };