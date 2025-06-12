import User from './user.model';
import Role from './Role';
import Vendor from './Vendor.sequelize';
import Product from './Product.sequelize';
import UserVendor from './UserVendor.sequelize';

// User-Role association
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
});

Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users'
});

// User-Vendor many-to-many association
User.belongsToMany(Vendor, {
  through: UserVendor,
  foreignKey: 'user_id',
  otherKey: 'vendor_id',
  as: 'vendors'
});

Vendor.belongsToMany(User, {
  through: UserVendor,
  foreignKey: 'vendor_id',
  otherKey: 'user_id',
  as: 'users'
});

// Vendor-Product association
Vendor.hasMany(Product, {
  foreignKey: 'vendor_id',
  as: 'products'
});

Product.belongsTo(Vendor, {
  foreignKey: 'vendor_id',
  as: 'vendor'
});

// Export models with associations
export {
  User,
  Role,
  Vendor,
  Product,
  UserVendor
};