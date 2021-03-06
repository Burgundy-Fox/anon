"use strict";
const { Model } = require("sequelize");
const { clearTheWords } = require('kasar')
module.exports = (sequelize, DataTypes) => {
  class Hiss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hiss.belongsTo(models.User, { foreignKey: "UserId" });
      Hiss.hasMany(models.Like, { foreignKey: "HissId" });
    }
  }
  Hiss.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content input cannot be null",
          },
          notEmpty: {
            msg: "Content input cannot be empty",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "image_url input must be in url format",
          },
        },
      },
      like: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hiss",
    }
  );
  Hiss.beforeCreate((instances, options) => {
    instances.content = clearTheWords(instances.content)
  });
  Hiss.beforeBulkUpdate((instances, options) => {
    instances.attributes.content = clearTheWords(instances.attributes.content)
  });
  return Hiss;
};
