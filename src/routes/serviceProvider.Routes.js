const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();
const serviceProviderController = require("../controllers/serviceProvider.Controller");
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../utils/validations/userValidation");
const { admin } = require("../middlewares/ensureRole");
// const { convertToLowercase } = require("../middlewares/stringToLowercase");

router.get("/", auth, admin, serviceProviderController.getServiceProviders); //get all service providers
router.get("/profile", serviceProviderController.getProfile); //get logged in user
router.get("/profile/:id", auth, serviceProviderController.getUser);
router.put("/profile", auth, updateProfileValidation, serviceProviderController.updateProfile);
router.put(
  "/reset-password",
  auth,
  changePasswordValidation,
  serviceProviderController.resetPassword
);
router.post(
  "/reset-password/:userId/:token",
  changePasswordValidation,
  serviceProviderController.resetForgotPassword
);
router.post("/forgot-password", serviceProviderController.forgotPassword);
router.get("/search/:searchParam", serviceProviderController.searchServiceProviders);
// get a user
// get all users
// view a service provider
// order a service

module.exports = router;
