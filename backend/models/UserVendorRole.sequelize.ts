import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User.sequelize';
import Vendor from './Vendor.sequelize';

class UserVendorRole extends Model {
  declare id: number;
  declare userId: number;
  declare vendorId: number;
  declare role: string;
  declare isPrimary: boolean;
  declare permissions: string[];
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserVendorRole.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendors',
      key: 'id',
    },
  },
  role: {
    type: DataTypes.ENUM('owner', 'admin', 'manager', 'staff', 'viewer'),
    allowNull: false,
    defaultValue: 'staff',
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Indicates if this is the primary vendor for the user',
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of specific permissions for this user-vendor relationship',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserVendorRole',
  tableName: 'user_vendor_roles',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'vendorId'],
    },
  ],
});

// Define associations
UserVendorRole.belongsTo(User, { foreignKey: 'userId' });
UserVendorRole.belongsTo(Vendor, { foreignKey: 'vendorId' });

export default UserVendorRole; 