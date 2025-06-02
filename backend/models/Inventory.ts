import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
  product: mongoose.Types.ObjectId;
  branch: mongoose.Types.ObjectId;
  stockQuantity: number;
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
  },
  { timestamps: true }
);

const Inventory = mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;