const { Product, History, Category } = require("../models");

async function authorization(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product && !Category) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (req.user.role !== "admin" && req.user.id !== product.authorId) {
      return res.status(401).json({ message: "Not Found" });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authorization };
