// IMPORTS
const express = require("express");
const productControllers = require("../controllers/productControllers");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router
  .route("/categories")
  .post(productControllers.createCategory)
  .get(productControllers.getAllCategories);

router
  .route("/")
  .post(productControllers.adminCreateProduct)
  .get(productControllers.getAllProducts)
  .patch(productControllers.adminUpdateProduct);

router.route("/:category_id").get(productControllers.getCategoryProducts);

module.exports = router;
