import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  address?: string;
  vendor: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    vendor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming User model represents vendors
  },
  { timestamps: true }
);

export default mongoose.model<IBranch>('Branch', BranchSchema);