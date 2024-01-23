const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authController");
const { createAccountValidation, loginValidation } = require("../utils/validations/userValidation");
const { auth } = require("../middlewares/auth.middleware");

router.post("/register", createAccountValidation, authcontroller.createAccount);
router.post("/login", loginValidation, authcontroller.login);
router.get("/logout", auth, authcontroller.logout);

module.exports = router;
