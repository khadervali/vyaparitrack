import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Category from './Category.sequelize';

class Product extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare quantity: number;
  declare type: string;
  declare stockQuantity: number;
  declare minStockQuantity: number;
  declare vendor_id: number;
  declare category_id: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

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
    field: 'stockQuantity',
    allowNull: true,
    defaultValue: 0,
  },
  minStockQuantity: {
    type: DataTypes.INTEGER,
    field: 'minStockQuantity',
    allowNull: false,
    defaultValue: 10,
  },

  category_id: {
    type: DataTypes.INTEGER,
    field: 'category_id', // Explicitly set the field name
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
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
    field: 'createdAt',
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
  underscored: false
});

// Define associations
Product.belongsTo(Category, { 
  foreignKey: 'category_id', 
  as: 'category',
  constraints: false // Disable foreign key constraints for testing
});

export default Product;