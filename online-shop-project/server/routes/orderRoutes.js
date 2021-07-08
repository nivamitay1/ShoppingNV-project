// IMPORTS
const express = require("express");
const orderControllers = require("../controllers/orderControllers");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router
  .route("/")
  .post(orderControllers.createOrder)
  .get(orderControllers.getDeliveryDates);

module.exports = router;
