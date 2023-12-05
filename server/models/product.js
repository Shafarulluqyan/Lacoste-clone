"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Product.hasMany(models.Image, {
        foreignKey: "ProductId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "name is required",
          },
          notNull: {
            args: true,
            msg: "name is required",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "slug is required",
          },
          notNull: {
            args: true,
            msg: "slug is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description is required",
          },
          notNull: {
            msg: "description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price is required",
          },
          notNull: {
            msg: "price is required",
          },
          isMin(value) {
            if (value < 100000) {
              throw new Error("Price should be at least 100000");
            }
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price is required",
          },
          notNull: {
            msg: "price is required",
          },
          isMin(value) {
            if (value < 100000) {
              throw new Error("Price should be at least 100000");
            }
          },
        },
      },
      CategoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      userMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.beforeValidate((product) => {
    if (!product.slug && product.name) {
      const slug = product.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      product.slug = slug;
    }
  });

  return Product;
};
