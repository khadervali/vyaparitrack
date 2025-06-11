import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  sku: string; // Added SKU field
  category?: string; // Added Category field
  unitOfMeasurement?: string; // Added Unit of Measurement field
  type: 'product' | 'service'; // Added type field
  initialStock?: number; // Renamed and made optional
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
  sku: { // Added SKU field
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  category: { // Added Category field
    type: String,
    trim: true,
  },
  unitOfMeasurement: { // Added Unit of Measurement field
    type: String,
    trim: true,
  },
  initialStock: { // Renamed and made optional
    type: Number,
  },
  type: { // Added type field
    type: String,
    required: true,
    enum: ['product', 'service'],
  },
  stock_quantity: { // Added stock_quantity field
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