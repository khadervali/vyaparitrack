import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role'; // Import Role model for type definition

// Define an interface for the User attributes
export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  createdAt?: Date;
  Role?: Role; // Add optional Role property
  updatedAt?: Date;
}

// Define the model
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  }
);

User.belongsTo(Role, {
  foreignKey: 'roleId',
});
export default User;
