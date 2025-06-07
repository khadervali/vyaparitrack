import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Inventory extends Model {}

Inventory.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Inventory',
  tableName: 'inventories',
  timestamps: true,
});

export default Inventory;
