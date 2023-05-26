const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontrollers");
const subscriptionController = require("../controllers/subscriptioncontroller");
const cartController = require("../controllers/cartcontrollers");
const validator = require("../validations/uservalidation");
const authentication = require("../middleware/auth");

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.post(
  "/user-registration",
  validator.userRegistrationValidation,
  userController.userRegistration
);

router.post("/user-login", validator.loginvalidation, userController.loginUser); //user login

router.post(
  "/create-subscription",
  authentication.authentication,
  subscriptionController.createSubsciption
); //create subscription

router.get(
  "/check-subscription",
  authentication.authentication,
  subscriptionController.getSubcription
); //create subscription

router.post(
  "/create-cart",
  authentication.authentication,
  authentication.authorization,
  cartController.createCart
); //create subscription

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;
