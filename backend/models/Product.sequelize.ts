import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Category from './Category.sequelize';
import Vendor from './Vendor.sequelize';

class Product extends Model {
  declare id: number;
  declare name: string;
  declare sku: string;
  declare description: string;
  declare price: number;
  declare costPrice: number;
  declare quantity: number;
  declare type: string;
  declare stockQuantity: number;
  declare minStockQuantity: number;
  declare vendor_id: number;
  declare supplier_id: number;
  declare category_id: number | null;
  declare hsnCode: string;
  declare gstRate: number;
  declare unitOfMeasure: string;
  declare reorderPoint: number;
  declare isActive: boolean;
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
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Purchase price from supplier',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('product', 'service'),
    allowNull: false,
    defaultValue: 'product',
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
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendors',
      key: 'id'
    },
    comment: 'The shop/vendor who owns this product',
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'vendors',
      key: 'id'
    },
    comment: 'The supplier who provides this product',
  },
  category_id: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  hsnCode: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'HSN/SAC code for GST',
  },
  gstRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    comment: 'GST rate applicable',
  },
  unitOfMeasure: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PCS',
    comment: 'Unit of measurement (PCS, KG, LTR, etc.)',
  },
  reorderPoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    comment: 'Stock level at which to reorder',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.belongsTo(Vendor, { foreignKey: 'vendor_id', as: 'vendor' });
Product.belongsTo(Vendor, { foreignKey: 'supplier_id', as: 'supplier' });

export default Product;