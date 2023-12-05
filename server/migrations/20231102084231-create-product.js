"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      mainImg: {
        type: Sequelize.STRING,
      },
      CategoryId: {
        references: {
          model: {
            tableName: "Categories",
          },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER,
      },
      authorId: {
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",

        type: Sequelize.INTEGER,
      },
      userMongoId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
