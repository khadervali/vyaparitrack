import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
  product: mongoose.Types.ObjectId;
  branch: mongoose.Types.ObjectId;
  stockQuantity: number;
  batchNumber?: string;
  lotNumber?: string;
  expiryDate?: Date;
  manufacturingDate?: Date;
  purchasePrice?: number;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    batchNumber: {
      type: String,
      trim: true,
    },
    lotNumber: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: Date,
    },
    manufacturingDate: {
      type: Date,
    },
    purchasePrice: {
      type: Number,
      min: 0,
    },
    location: {
      type: String,
      trim: true,
      comment: 'Storage location within the branch (e.g., "Shelf A-12")'
    }
  },
  { timestamps: true }
);

// Create compound index for product+branch+batch to ensure unique batch tracking
InventorySchema.index({ product: 1, branch: 1, batchNumber: 1 }, { unique: true, sparse: true });

// Create index for expiry date to quickly find expiring products
InventorySchema.index({ expiryDate: 1 });

const Inventory = mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;