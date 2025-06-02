import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  type: 'product' | 'service'; // Added type field
  stockQuantity?: number; // Added stockQuantity field, made optional
  minStockQuantity: number; // Added minStockQuantity field
  vendor: mongoose.Types.ObjectId;
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
  quantity: { // Keeping quantity for now, could be consolidated or repurposed
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  type: { // Added type field
    type: String,
    required: true,
    enum: ['product', 'service'],
  },
  stockQuantity: { // Added stockQuantity field
    type: Number,
    required: false, // Made optional
    min: 0,
    default: 0, // Initialized to 0
  },
  minStockQuantity: { // Added minStockQuantity field
    type: Number,
    required: true,
    default: 10, // Default value set to 10
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your User model is named 'User'
    required: true,
  },
},
{
  timestamps: true,
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;