import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product.sequelize';

const Vendor = sequelize.define('vendors', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  }
}, {
  underscored: true
});

Vendor.hasMany(Product, { foreignKey: 'vendor_id' });

export default Vendor;