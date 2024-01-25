const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");


class Users extends Model {}

Users.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(60),
    },
    firstName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.BLOB(),
      allowNull: true,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
    values: ['instructor', 'trainee', 'admin']
    },
    cohort: {
      type: DataTypes.STRING(),
    },
    stack: {
      type: DataTypes.STRING(),
    },
    isRequested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },  
  },
  {

    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "users",
  }
);

module.exports = Users;
