const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");
const { validationResult } = require("express-validator");

async function createAccount(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.errors.length == 0)
      return res.status(400).json({ success: false, msg: errors.array() });

    const userData = req.body;
    const user = await authService.createAccount(userData);

    const modifiedUser = user._doc;
    delete modifiedUser.password;
    return res.status(201).json({ success: true, user: modifiedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
}

async function login(req, res) {
  try {
    const userData = req.body;
    const { userObject, token } = await authService.login(userData);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ success: true, user: userObject });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function logout(req, res) {
  try {
    // const logout = await authService.logout(req);
    console.log(res.cookie);
    res.cookie("jwt", "", { maxAge: 1 });
    console.log(res.cookie);
    res.json({ success: true });
  } catch (err) {}
}

module.exports = { createAccount, login, logout };
