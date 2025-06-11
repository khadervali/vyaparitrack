import mongoose, { Document, Schema } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  code: string;
  businessType: 'sole_proprietorship' | 'partnership' | 'llp' | 'private_limited' | 'public_limited' | 'other';
  gstin?: string;
  pan?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  contactPersonEmail?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  subscriptionPlan?: string;
  subscriptionExpiry?: Date;
  isActive: boolean;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    businessType: {
      type: String,
      required: true,
      enum: ['sole_proprietorship', 'partnership', 'llp', 'private_limited', 'public_limited', 'other'],
      default: 'sole_proprietorship'
    },
    gstin: {
      type: String,
      trim: true
    },
    pan: {
      type: String,
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
    country: {
      type: String,
      default: 'India',
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    contactPerson: {
      type: String,
      trim: true
    },
    contactPersonPhone: {
      type: String,
      trim: true
    },
    contactPersonEmail: {
      type: String,
      trim: true
    },
    logo: {
      type: String,
      trim: true
    },
    primaryColor: {
      type: String,
      default: '#3B82F6',
      trim: true
    },
    secondaryColor: {
      type: String,
      default: '#1E3A8A',
      trim: true
    },
    subscriptionPlan: {
      type: String,
      trim: true
    },
    subscriptionExpiry: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>('Vendor', VendorSchema);