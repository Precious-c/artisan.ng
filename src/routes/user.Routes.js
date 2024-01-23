const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../utils/validations/userValidation");
const { admin } = require("../middlewares/ensureRole");
const { convertToLowercase } = require("../middlewares/stringToLowercase");

router.get("/get/:role?", auth, admin, convertToLowercase, userController.getUsers);
router.get("/profile", auth, userController.getProfile);
router.put(
  "/profile",
  auth,
  updateProfileValidation,
  convertToLowercase,
  userController.updateProfile
);
router.put("/reset-password", auth, changePasswordValidation, userController.resetPassword);
router.post(
  "/reset-password/:userId/:token",
  changePasswordValidation,
  userController.resetForgotPassword
);
router.post("/forgot-password", userController.forgotPassword);
router.get("/search/:searchParam", convertToLowercase, userController.searchUsers);
// get a user
// get all users
// view a service provider
// order a service

module.exports = router;
