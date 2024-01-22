const express = require("express");
const router = express.Router();
const { createAccount, login } = require("../controllers/authController");

router.post("/register", createAccount);
router.post("/login", login);

module.exports = router;
