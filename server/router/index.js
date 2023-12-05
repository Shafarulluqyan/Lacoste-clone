const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const Controller = require("../controllers/controller");
const { authenticationUser } = require("../middleware/authentication");

router.get("/pub/products", Controller.getAllProducts);

router.get("/pub/products/:id", Controller.getOneProduct);

router.get("/pub/categories", Controller.getAllCategories);


router.post("/login", Controller.postLogin);

// router.use(authenticationUser);

router.post("/register", Controller.postUser);

router.get("/products", Controller.getAllProducts);

router.get("/products/:id", Controller.getOneProduct);

router.post("/products", Controller.postProduct);

router.put("/products/:id", Controller.putProduct);

router.delete("/products/:id", Controller.deleteProduct);

router.get("/categories", Controller.getAllCategories);

router.get("/categories/:id", Controller.getOneCategory);

router.post("/categories", Controller.postCategory);

router.put("/categories/:id", authorization, Controller.putCategory);

router.delete("/categories/:id", Controller.deleteCategory);

// router.use(authenticationUser);

module.exports = router;
