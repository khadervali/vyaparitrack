import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import Vendor from './Vendor.sequelize';

class UserVendor extends Model {
  declare user_id: number;
  declare vendor_id: number;
  declare role: string;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

UserVendor.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'vendors',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('owner', 'manager', 'staff'),
    allowNull: false,
    defaultValue: 'staff',
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'UserVendor',
  tableName: 'user_vendors',
  timestamps: true,
  underscored: true,
});

// Define associations
User.belongsToMany(Vendor, { 
  through: UserVendor,
  foreignKey: 'user_id',
  otherKey: 'vendor_id'
});

Vendor.belongsToMany(User, { 
  through: UserVendor,
  foreignKey: 'vendor_id',
  otherKey: 'user_id'
});

export default UserVendor;