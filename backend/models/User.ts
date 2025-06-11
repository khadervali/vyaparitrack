import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'Super Admin' | 'Vendor Admin' | 'Vendor Staff' | 'Inventory Manager';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  vendor?: mongoose.Types.ObjectId;
  branches?: mongoose.Types.ObjectId[];
  permissions?: string[];
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Super Admin', 'Vendor Admin', 'Vendor Staff', 'Inventory Manager'],
      default: 'Vendor Staff',
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    branches: [{
      type: Schema.Types.ObjectId,
      ref: 'Branch',
    }],
    permissions: [{
      type: String,
      trim: true,
    }],
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password along with the new salt
    const hash = await bcrypt.hash(user.password, salt);
    
    // Override the plaintext password with the hashed one
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Create indexes for common queries
UserSchema.index({ vendor: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;