import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  code: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstin?: string;
  phone?: string;
  email?: string;
  isHeadOffice: boolean;
  vendor: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    },
    address: { 
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    pincode: {
      type: String,
      trim: true
    },
    gstin: {
      type: String,
      trim: true,
      comment: 'GST Identification Number for this branch'
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    isHeadOffice: {
      type: Boolean,
      default: false
    },
    vendor: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Create compound index for vendor+code to ensure branch code uniqueness per vendor
BranchSchema.index({ vendor: 1, code: 1 }, { unique: true });

export default mongoose.model<IBranch>('Branch', BranchSchema);