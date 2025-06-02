import mongoose, { Document, Schema, Types } from 'mongoose';

// Define the interface for SalesOrderItem (forward declaration for ref)
interface ISalesOrderItem extends Document {
  product: Types.ObjectId; // Ref to Product model
  quantity: number;
  unitPrice: number;
  subtotal: number;
  salesOrder: Types.ObjectId; // Ref to SalesOrder model
}

// Define the interface for SalesOrder
export interface ISalesOrder extends Document {
  orderId: string;
  date: Date;
  customer: Types.ObjectId; // Ref to Customer model (to be created)
  items: Types.ObjectId[] | ISalesOrderItem[]; // Ref to SalesOrderItem model
  totalAmount: number;
  status: 'Draft' | 'Pending' | 'Completed' | 'Cancelled';
  vendor: Types.ObjectId; // Ref to Vendor model (to be created)
  createdBy: Types.ObjectId; // Ref to User model (assuming User model exists)
}

const SalesOrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'SalesOrderItem' }],
  totalAmount: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    required: true,
    enum: ['Draft', 'Pending', 'Completed', 'Cancelled'],
    default: 'Draft',
  },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const SalesOrder = mongoose.model<ISalesOrder>('SalesOrder', SalesOrderSchema);

export default SalesOrder;