import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product.sequelize';

class Vendor extends Model {}

Vendor.init({
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
  underscored: true,
  sequelize,
  modelName: 'Vendor',
  tableName: 'vendors'
});

export default Vendor;