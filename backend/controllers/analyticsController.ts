import { Request, Response } from 'express';
import { Op } from 'sequelize';
import sequelize from '../config/database';
import SalesOrder from '../models/SalesOrder';
import Product from '../models/Product';
import Inventory from '../models/Inventory';
import { CustomRequest } from '../middleware/authMiddleware';

// Helper to get date range based on timeframe
const getDateRange = (timeframe: string) => {
  const now = new Date();
  const startDate = new Date();
  
  switch (timeframe) {
    case 'day':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    default:
      startDate.setDate(now.getDate() - 7); // Default to week
  }
  
  return { startDate, endDate: now };
};

// Get analytics data for dashboard
export const getAnalytics = async (req: CustomRequest, res: Response) => {
  try {
    const { timeframe = 'week' } = req.query;
    const { startDate, endDate } = getDateRange(timeframe as string);
    const vendorId = req.user?.vendor_id;

    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    // Get sales data
    const salesData = await SalesOrder.findAll({
      where: {
        vendorId,
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'total']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
    });

    // Format sales data for frontend
    const sales = salesData.map(item => ({
      label: new Date(item.getDataValue('date')).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: parseInt(item.getDataValue('count'))
    }));

    // Format revenue data
    const revenue = salesData.map(item => ({
      label: new Date(item.getDataValue('date')).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: parseFloat(item.getDataValue('total') || 0)
    }));

    // Get inventory levels
    const inventoryData = await Inventory.findAll({
      where: { vendorId },
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'total']
      ],
      group: ['productId'],
      include: [{ model: Product, attributes: ['name'] }]
    });

    // Format inventory data
    const inventory = inventoryData.slice(0, 10).map(item => ({
      label: item.Product?.name || `Product ${item.productId}`,
      value: parseInt(item.getDataValue('total') || 0)
    }));

    res.json({
      sales,
      revenue,
      inventory
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Failed to fetch analytics data' });
  }
};

// Get inventory insights
export const getInventoryInsights = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;

    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    // Get top products by value
    const topProducts = await Inventory.findAll({
      where: { vendorId },
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
        [sequelize.literal('SUM(quantity * Product.price)'), 'totalValue']
      ],
      include: [{ 
        model: Product, 
        attributes: ['name', 'price'] 
      }],
      group: ['productId', 'Product.id'],
      order: [[sequelize.literal('totalValue'), 'DESC']],
      limit: 5
    });

    // Get low stock items
    const lowStockItems = await Inventory.findAll({
      where: { 
        vendorId,
        quantity: { [Op.lt]: sequelize.col('Product.minStockLevel') }
      },
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      include: [{ 
        model: Product, 
        attributes: ['name', 'minStockLevel'] 
      }],
      group: ['productId', 'Product.id'],
      limit: 5
    });

    // Get expiring items (if expiry tracking is implemented)
    const expiringItems = await Inventory.findAll({
      where: { 
        vendorId,
        expiryDate: { 
          [Op.not]: null,
          [Op.lt]: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        }
      },
      attributes: [
        'productId',
        'expiryDate',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      include: [{ 
        model: Product, 
        attributes: ['name'] 
      }],
      group: ['productId', 'expiryDate', 'Product.id'],
      order: [['expiryDate', 'ASC']],
      limit: 5
    });

    res.json({
      topProducts: topProducts.map(item => ({
        id: item.productId,
        name: item.Product?.name,
        quantity: parseInt(item.getDataValue('totalQuantity') || 0),
        value: parseFloat(item.getDataValue('totalValue') || 0)
      })),
      lowStock: lowStockItems.map(item => ({
        id: item.productId,
        name: item.Product?.name,
        quantity: parseInt(item.getDataValue('totalQuantity') || 0),
        threshold: item.Product?.minStockLevel
      })),
      expiringItems: expiringItems.map(item => ({
        id: item.productId,
        name: item.Product?.name,
        quantity: parseInt(item.getDataValue('totalQuantity') || 0),
        expiryDate: item.expiryDate
      }))
    });
  } catch (error) {
    console.error('Error fetching inventory insights:', error);
    res.status(500).json({ message: 'Failed to fetch inventory insights' });
  }
};

export default {
  getAnalytics,
  getInventoryInsights
};