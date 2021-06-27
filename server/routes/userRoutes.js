// IMPORTS
const express = require("express");
const userController = require("../controllers/userControllers");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router.route("/").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
