import express from 'express';
import { Request, Response } from 'express';
import { CustomRequest, protect } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Temporary placeholder analytics endpoints
router.get('/', (req: CustomRequest, res: Response) => {
  try {
    // Mock data for development
    const mockData = {
      sales: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 150 },
        { label: 'Wed', value: 180 },
        { label: 'Thu', value: 140 },
        { label: 'Fri', value: 190 },
        { label: 'Sat', value: 210 },
        { label: 'Sun', value: 170 }
      ],
      revenue: [
        { label: 'Mon', value: 12000 },
        { label: 'Tue', value: 15000 },
        { label: 'Wed', value: 18000 },
        { label: 'Thu', value: 14000 },
        { label: 'Fri', value: 19000 },
        { label: 'Sat', value: 21000 },
        { label: 'Sun', value: 17000 }
      ],
      inventory: [
        { label: 'Product A', value: 120 },
        { label: 'Product B', value: 85 },
        { label: 'Product C', value: 65 },
        { label: 'Product D', value: 45 },
        { label: 'Product E', value: 30 }
      ]
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Error in analytics endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/inventory/insights', (req: CustomRequest, res: Response) => {
  try {
    // Mock data for development
    const mockData = {
      topProducts: [
        { id: 1, name: 'Product A', quantity: 120, value: 12000 },
        { id: 2, name: 'Product B', quantity: 85, value: 8500 },
        { id: 3, name: 'Product C', quantity: 65, value: 6500 }
      ],
      lowStock: [
        { id: 4, name: 'Product D', quantity: 5, threshold: 10 },
        { id: 5, name: 'Product E', quantity: 3, threshold: 15 },
        { id: 6, name: 'Product F', quantity: 2, threshold: 20 }
      ],
      expiringItems: [
        { id: 7, name: 'Product G', expiryDate: '2025-07-15', quantity: 10 },
        { id: 8, name: 'Product H', expiryDate: '2025-07-20', quantity: 15 },
        { id: 9, name: 'Product I', expiryDate: '2025-07-25', quantity: 8 }
      ]
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Error in inventory insights endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;