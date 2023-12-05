const { comparePass } = require("../helpers/bcrypt");
const { signToken, decodedToken } = require("../helpers/jwt");
const { Product, Category, Image, User, sequelize } = require("../models");
const { Op } = require("sequelize");
class Controller {
  static async postUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const userRaw = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      const user = userRaw.toJSON();
      delete user.password;
      res
        .status(201)
        .json({ message: `account with ${user.email} success to create` });
    } catch (err) {
      if (
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        console.log(err);
        res.status(500).json({ message: err.errors[0].message });
      }
    }
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(401).json({ message: "Email is required" });
      if (!password)
        return res.status(401).json({ message: "Password is required" });
      const user = await User.findOne({ where: { email } });
      if (!user || !comparePass(password, user.password))
        return res.status(401).json({ message: "Invalid email/password" });
      res.json({ access_token: signToken({ id: user.id }) });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          { model: User, attributes: ["username"] },
          { model: Category },
          { model: Image },
        ],
      });
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getOneProduct(req, res, next) {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
        include: [
          { model: Image },
          { model: Category },
          { model: User, attributes: ["username"] },
        ],
      });
      if (!product) throw { name: "notFound" };
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async postProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log(req.body, "<<<masuk");
      const {
        name,
        description,
        price,
        mainImg,
        CategoryId,
        authorId,
        userMongoId,
        images,
      } = req.body;
      console.log(images, "<><>imagessdaf");
      const product = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          authorId,
          userMongoId,
        },
        { transaction: t }
      );

      console.log(product.id, product.dataValues.id, "id");
      // Add Images
      images.map((image) => {
        image.ProductId = product.id;
        // image.imgUrl = image.imgUrl;
        return image;
      });
      console.log(images, "<<ini images");
      await Image.bulkCreate(images, {
        transaction: t,
      });

      await t.commit();

      res.status(201).json({ message: `${product.name} succes to add` });
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async putProduct(req, res, next) {
    console.log(req.body, "<<<,params");
    try {
      const { name, description, price, mainImg, CategoryId, authorId } = req.body;
      const ProductId = req.params.id;
      const product = await Product.findByPk(+ProductId);
      if (!product) throw { name: "NotFound" };
      console.log(product, "nando");

      console.log(req.body, "rifqi");
      await Product.update(
        {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          authorId
        },
        { where: { id: +ProductId } }
      );

      res
        .status(201)
        .json({ message: `Product ${ProductId} has been edited successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      // return res.send(req.params)
      const product = await Product.findOne({ where: { id } });
      if (!product) throw { name: "notFound" };
      await Product.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `product with id ${product.id} success to delete` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const category = await Category.findAll();
      res.status(200).json({ category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getOneCategory(req, res) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id },
      });
      if (!category) throw { name: "notFound" };
      res.status(200).json({ category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async postCategory(req, res) {
    try {
      const category = await Category.create({
        ...req.body,
        authorId: req.user.id,
      });
      res
        .status(201)
        .json({ message: `Category with id ${category.id} has been created` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async putCategory(req, res) {
    try {
      const updateCategory = await Category.update(
        {
          ...req.body,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).json({ message: "successfully updated category " });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      // return res.send(req.params)
      const category = await Category.findOne({ where: { id } });
      if (!category) {
        return res.status(404).json({ message: "Not Found" });
      }
      await Category.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `category with id ${category.id} success to delete` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async;
}

module.exports = Controller;
