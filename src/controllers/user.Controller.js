const { validationResult } = require("express-validator");
const userService = require("../services/user.Service");

async function getProfile(req, res) {
  try {
    const userId = req.userId;
    const { firstName, lastName, email, phoneNumber, role, registration_date } =
      await userService.getUser(userId);
    const userProfile = { firstName, lastName, email, phoneNumber, role, registration_date };
    return res.json({ success: true, user: userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function updateProfile(req, res) {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0)
      return res.status(400).json({ success: false, msg: errors.errors });

    const userId = req.userId;
    const body = req.body;

    const { firstName, lastName, email, phoneNumber, role, registration_date } =
      await userService.updateProfile(userId, body);
    const userProfile = { firstName, lastName, email, phoneNumber, role, registration_date };

    return res.json({ success: true, user: userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0)
      return res.status(400).json({ success: false, msg: errors.errors });
    const userId = req.userId;
    const body = req.body;
    const status = await userService.resetPassword(userId, body);
    if (status) return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const email = req.body.email;
    //generate and send password reset link to user's email
    const done = await userService.forgotPassword(email);
    if (done)
      return res.json({ success: true, msg: "Password reset link sent to user's email account" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function resetForgotPassword(req, res) {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0)
      return res.status(400).json({ success: false, msg: errors.errors });

    const { userId, token } = req.params;
    const newPassword = req.body.newPassword;

    const done = await userService.resetForgotPassword(userId, token, newPassword);
    if (done) return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

module.exports = { getProfile, updateProfile, resetPassword, forgotPassword, resetForgotPassword };
