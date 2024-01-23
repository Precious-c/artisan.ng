const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../utils/validations/userValidation");

router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, updateProfileValidation, userController.updateProfile);
router.put("/reset-password", auth, changePasswordValidation, userController.resetPassword);
router.post(
  "/reset-password/:userId/:token",
  changePasswordValidation,
  userController.resetForgotPassword
);
router.post("/forgot-password", userController.forgotPassword);
// get a user
// get all users
// view a service provider
// order a service

module.exports = router;
