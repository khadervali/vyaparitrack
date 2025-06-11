import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  sku: string;
  hsn_sac?: string;
  gst_rate?: number;
  category?: string;
  unitOfMeasurement?: string;
  type: 'product' | 'service';
  minStockQuantity?: number;
  barcode?: string;
  vendor: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hsn_sac: {
    type: String,
    trim: true,
    comment: 'HSN code for products or SAC code for services'
  },
  gst_rate: {
    type: Number,
    default: 18,
    comment: 'GST percentage rate'
  },
  category: {
    type: String,
    trim: true,
  },
  unitOfMeasurement: {
    type: String,
    trim: true,
    default: 'Pcs',
  },
  type: {
    type: String,
    required: true,
    enum: ['product', 'service'],
    default: 'product'
  },
  minStockQuantity: {
    type: Number,
    default: 10,
  },
  barcode: {
    type: String,
    trim: true,
    sparse: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true,
});

// Create compound index for vendor+sku to ensure SKU uniqueness per vendor
productSchema.index({ vendor: 1, sku: 1 }, { unique: true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;