const jwt = require("jsonwebtoken");
const { encrypt, comparePassword } = require("../services/encryption.service");
const createAccountValidation = require("../middlewares/validation");
const authService = require("../services/auth.service");

async function createAccount(req, res) {
  try {
    const userData = req.body;
    // userData = createAccountValidation(userData);
    userData.password = await encrypt(userData.password);
    const user = await authService.createAccount(userData);
    const modifiedUser = user._doc;
    delete modifiedUser.password;
    return res.status(201).json({ success: true, modifiedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: true, msg: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await authService.login(req.body);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: "Invalid credentials" });
    const token = jwt.sign(user.id, JWT_SECRET, { expiresIn: "1h" });
    user.token = token;
    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function logout(req, res) {
  try {
  } catch (err) {}
}

module.exports = { createAccount, login };
