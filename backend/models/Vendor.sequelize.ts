import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Vendor extends Model {
  declare id: number;
  declare name: string;
  declare address: string;
  declare phone: string;
  declare email: string;
  declare gstin: string;
  declare created_at: Date;
  declare updated_at: Date;
}

Vendor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gstin: {
    type: DataTypes.STRING,
    allowNull: true,
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
  modelName: 'Vendor',
  tableName: 'vendors',
  timestamps: true,
  underscored: true,
});

export default Vendor;