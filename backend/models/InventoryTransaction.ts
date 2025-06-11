import mongoose, { Document, Schema } from 'mongoose';

export type TransactionType = 
  | 'purchase' 
  | 'sale' 
  | 'return_in' 
  | 'return_out' 
  | 'adjustment' 
  | 'transfer_in' 
  | 'transfer_out' 
  | 'initial';

export interface IInventoryTransaction extends Document {
  product: mongoose.Types.ObjectId;
  branch: mongoose.Types.ObjectId;
  quantity: number;
  type: TransactionType;
  batchNumber?: string;
  lotNumber?: string;
  referenceId?: string;
  referenceType?: string;
  notes?: string;
  performedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryTransactionSchema: Schema = new Schema(
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
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'purchase',
        'sale',
        'return_in',
        'return_out',
        'adjustment',
        'transfer_in',
        'transfer_out',
        'initial'
      ],
    },
    batchNumber: {
      type: String,
      trim: true,
    },
    lotNumber: {
      type: String,
      trim: true,
    },
    referenceId: {
      type: String,
      trim: true,
      comment: 'ID of related document (e.g., purchase order ID, sales order ID)'
    },
    referenceType: {
      type: String,
      trim: true,
      comment: 'Type of reference document (e.g., "purchase_order", "sales_order")'
    },
    notes: {
      type: String,
      trim: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

// Create indexes for common queries
InventoryTransactionSchema.index({ product: 1, branch: 1 });
InventoryTransactionSchema.index({ type: 1 });
InventoryTransactionSchema.index({ createdAt: 1 });
InventoryTransactionSchema.index({ referenceId: 1, referenceType: 1 });

const InventoryTransaction = mongoose.model<IInventoryTransaction>('InventoryTransaction', InventoryTransactionSchema);

export default InventoryTransaction;