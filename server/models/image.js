"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, {
        foreignKey: "ProductId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Image.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "imgUrl is required",
          },
          notNull: {
            msg: "imgUrl is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
