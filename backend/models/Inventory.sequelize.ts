import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product.sequelize';

class Inventory extends Model {
  public id!: number;
  public productId!: number;
  public vendorId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventory',
    timestamps: true,
  }
);

// Define associations
Inventory.belongsTo(Product, { foreignKey: 'productId' });

export default Inventory;
