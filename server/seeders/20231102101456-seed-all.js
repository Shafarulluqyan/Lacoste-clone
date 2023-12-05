"use strict";
const { hashPass } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require("../data/user.json");
    user.forEach((el) => {
      delete el.id;
      el.password = hashPass(el.password);
      el.createdAt = el.updatedAt = new Date();
    });
    const category = require("../data/category.json");
    category.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    const product = require("../data/product.json");
    product.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    const images = require("../data/images.json");
    images.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", user);
    await queryInterface.bulkInsert("Categories", category);
    await queryInterface.bulkInsert("Products", product);
    await queryInterface.bulkInsert("Images", images);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null);
    await queryInterface.bulkDelete("Categories", null);
    await queryInterface.bulkDelete("Products", null);
    await queryInterface.bulkDelete("Images", null);
  },
};