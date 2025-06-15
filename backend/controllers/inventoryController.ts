import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Inventory from '../models/Inventory.sequelize';
import Product from '../models/Product.sequelize';
import { CustomRequest } from '../middleware/authMiddleware';
import sequelize from '../config/database';

// Get inventory items for a vendor
export const getInventory = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;
    
    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const inventory = await Inventory.findAll({
      where: { vendorId },
      include: [{ model: Product }]
    });

    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
};

// Get low stock items
export const getLowStockItems = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;
    
    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const lowStockItems = await Inventory.findAll({
      where: { 
        vendorId,
        quantity: { [Op.lt]: sequelize.col('Product.minStockLevel') }
      },
      include: [{ model: Product }]
    });

    res.json(lowStockItems);
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({ message: 'Failed to fetch low stock items' });
  }
};

// Adjust stock (increase or decrease)
export const adjustStock = async (req: CustomRequest, res: Response) => {
  try {
    const vendorId = req.user?.vendor_id;
    const { productId, quantity, adjustmentType, reason } = req.body;
    
    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }
    
    if (!productId || !quantity || !adjustmentType) {
      return res.status(400).json({ message: 'Product ID, quantity, and adjustment type are required' });
    }

    // Find the inventory item
    const inventoryItem = await Inventory.findOne({
      where: { 
        productId,
        vendorId
      }
    });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Calculate new quantity
    let newQuantity = inventoryItem.quantity;
    if (adjustmentType === 'stock-in') {
      newQuantity += parseInt(quantity);
    } else if (adjustmentType === 'stock-out') {
      newQuantity -= parseInt(quantity);
      if (newQuantity < 0) {
        return res.status(400).json({ message: 'Cannot reduce stock below zero' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid adjustment type' });
    }

    // Update inventory
    await inventoryItem.update({ quantity: newQuantity });
    
    // Also update the product's stockQuantity
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update({ stockQuantity: newQuantity });
    }

    // Create inventory transaction record (if you have a transactions table)
    // await InventoryTransaction.create({
    //   productId,
    //   vendorId,
    //   quantity: parseInt(quantity),
    //   type: adjustmentType,
    //   reason,
    //   previousQuantity: inventoryItem.quantity,
    //   newQuantity
    // });

    res.json({ 
      message: 'Stock adjusted successfully',
      inventoryItem
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({ message: 'Failed to adjust stock' });
  }
};

export default {
  getInventory,
  getLowStockItems,
  adjustStock
};