import mongoose from 'mongoose';

const PurchaseOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // Assuming you will create a Supplier model later
    required: false, // Can be optional initially if supplier is added later
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PurchaseOrderItem',
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Draft', 'Ordered', 'Received', 'Partial Received', 'Cancelled'],
    default: 'Draft',
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor', // Assuming you have a Vendor model
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

export default PurchaseOrder;