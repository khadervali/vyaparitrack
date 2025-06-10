import Product from './Product.sequelize';
import Vendor from './Vendor.sequelize';

// Define associations
export function initializeAssociations() {
  // Vendor - Product (one-to-many)
  Vendor.hasMany(Product, { foreignKey: 'vendor_id' });
  Product.belongsTo(Vendor, { foreignKey: 'vendor_id' });
}
