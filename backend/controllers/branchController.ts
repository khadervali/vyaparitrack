import { Request, Response } from 'express';
import Branch from '../models/Branch';
import { CustomRequest } from '../middleware/authMiddleware'; // Assuming you have auth middleware that adds user to request

// Add a new branch
export const addBranch = async (req: CustomRequest, res: Response) => {
  try {
    // In a real application, you would get the vendor ID from the authenticated user
    const vendorId = req.user?.vendorId; // Assuming your auth middleware adds vendorId

    if (!vendorId) {
      return res.status(401).json({ message: 'Vendor not authenticated' });
    }

    const { name, address } = req.body;

    const newBranch = new Branch({
      name,
      address,
      vendor: vendorId,
    });

    const branch = await newBranch.save();
    res.status(201).json(branch);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all branches for a vendor
export const getBranches = async (req: CustomRequest, res: Response) => {
  try {
    // In a real application, you would get the vendor ID from the authenticated user
    const vendorId = req.user?.vendorId; // Assuming your auth middleware adds vendorId

    if (!vendorId) {
      return res.status(401).json({ message: 'Vendor not authenticated' });
    }

    const branches = await Branch.find({ vendor: vendorId });
    res.json(branches);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single branch by ID
export const getBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(branch);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a branch by ID
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      { name, address },
      { new: true } // Return the updated document
    );

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(branch);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a branch by ID
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json({ message: 'Branch deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};