import { Request, Response } from 'express';
import Inventory from '../models/Inventory'; // Assuming you have an Inventory model
import mongoose from 'mongoose';
import Product from '../models/Product'; // Assuming you have a Product model


export const transferStock = async (req: Request, res: Response) => {
  const { productId, sourceBranchId, destinationBranchId, quantity } = req.body;

  if (!productId || !sourceBranchId || !destinationBranchId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Missing required fields or invalid quantity' });
  }

  if (sourceBranchId === destinationBranchId) {
    return res.status(400).json({ message: 'Source and destination branches cannot be the same' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Decrease stock in the source branch
    const sourceInventory = await Inventory.findOne({
      product: productId,
      branch: sourceBranchId,
    }).session(session);

    if (!sourceInventory || sourceInventory.stockQuantity < quantity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient stock in the source branch' });
    }

    sourceInventory.stockQuantity = (sourceInventory.stockQuantity || 0) - quantity;
    await sourceInventory.save({ session });

    // TODO: Check for low stock in the source branch and trigger alert if necessary
    // if (sourceInventory.stockQuantity < product.minStockQuantity) { trigger low stock alert }

    // Increase stock in the destination branch
    const destinationInventory = await Inventory.findOne({
      product: productId,
      branch: destinationBranchId,
    }).session(session);

    if (destinationInventory) {
      destinationInventory.stockQuantity = (destinationInventory.stockQuantity || 0) + quantity;
      await destinationInventory.save({ session });
    } else {
      // Create a new inventory entry if the product doesn't exist in the destination branch
      const newInventory = new Inventory({
        product: productId,
        branch: destinationBranchId,
        stockQuantity: quantity,
      });
      await newInventory.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Stock transfer successful' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error transferring stock:', error);
    res.status(500).json({ message: 'Failed to transfer stock', error });
  }
};

export const stockIn = async (req: Request, res: Response) => {
  const { productId, branchId, quantity } = req.body;

  if (!productId || !branchId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Missing required fields or invalid quantity' });
  }

  try {
    let inventory = await Inventory.findOne({
      product: productId,
      branch: branchId,
    });

    if (inventory) {
      inventory.stockQuantity = (inventory.stockQuantity || 0) + quantity;
    } else {
      inventory = new Inventory({
        product: productId,
        branch: branchId,
        stockQuantity: quantity,
      });
    }

    await inventory.save();

    res.status(200).json({ message: 'Stock updated successfully', inventory });
  } catch (error) {
    console.error('Error performing stock in:', error);
    res.status(500).json({ message: 'Failed to perform stock in', error });
  }
};
export const stockOut = async (req: Request, res: Response) => {
  const { productId, branchId, quantity } = req.body;

  if (!productId || !branchId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Missing required fields or invalid quantity' });
  }

  try {
    const inventory = await Inventory.findOne({
      product: productId,
      branch: branchId,
    });

    if (!inventory || inventory.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    inventory.stockQuantity = (inventory.stockQuantity || 0) - quantity;
    await inventory.save();

    // Fetch the product to get minStockQuantity
    const product = await Product.findById(productId);

    if (product && inventory.stockQuantity <= (product.minStockQuantity || 0)) {
      // TODO: Trigger low stock alert
      console.log(`Low stock alert: Product ${product.name} in branch ${branchId} is low on stock.`);
      // This is where you would typically call a notification service or function
    }
    
    res.status(200).json({ message: 'Stock updated successfully', inventory });
  } catch (error) {
    console.error('Error performing stock out:', error);
    res.status(500).json({ message: 'Failed to perform stock out', error });
  }
};

