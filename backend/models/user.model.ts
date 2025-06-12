import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role'; // Import Role model for type definition

// Define an interface for the User attributes
export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  Role?: Role; // Add optional Role property
}

// Define the model
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role_id!: number;
  public first_name?: string;
  public last_name?: string;
  public is_active?: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public Role?: Role;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // vendor_id removed - now using UserVendor junction table for many-to-many relationship
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

User.belongsTo(Role, {
  foreignKey: 'role_id',
});
export default User;
