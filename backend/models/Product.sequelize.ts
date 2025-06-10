import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('product', 'service'),
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    field: 'stockQuantity', // Explicitly map to the database column name
    allowNull: true,
    defaultValue: 0,
  },
  minStockQuantity: {
    type: DataTypes.INTEGER,
    field: 'minStockQuantity', // Explicitly map to the database column name
    allowNull: false,
    defaultValue: 10,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendors',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
 field: 'createdAt', // Explicitly map to the database column name
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
 field: 'updatedAt', // Explicitly map to the database column name
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
  underscored: false
});

export default Product;