// IMPORTS
const express = require("express");
const cartControllers = require("../controllers/cartControllers");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router
  .route("/cart-item")
  .post(cartControllers.addItemToCart)
  .delete(cartControllers.removeItemFromCart)
  .patch(cartControllers.updateQuantityItemInCart);

router.route("/:user_id").get(cartControllers.getOrCreateCart);

router.route("/").delete(cartControllers.clearTheCart);

module.exports = router;
