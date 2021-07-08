// IMPORTS
const express = require("express");
const detailsControllers = require("../controllers/detailsControllers");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router.route("/").get(detailsControllers.getDetails);

module.exports = router;
