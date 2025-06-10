import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Inventory extends Model {}

Inventory.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Inventory',
  tableName: 'inventories',
  timestamps: true,
  underscored: true,
});

export default Inventory;
