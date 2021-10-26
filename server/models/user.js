"use strict";
const { passwordHasher } = require("../helpers/index");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Hiss, { foreignKey: "UserId" });
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
      User.hasMany(models.Like, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 50],
        },
      },
      avatar: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      wallet: {
        type: DataTypes.INTEGER,
        validate: {
          isGreaterThan0(value) {
            if (value < 0) {
              throw new Error("quantity can't be negative.");
            }
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instances, options) => {
    instances.password = passwordHasher(instances.password);
  });
  return User;
};
