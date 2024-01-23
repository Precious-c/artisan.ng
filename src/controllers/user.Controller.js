const { validationResult } = require("express-validator");
const userService = require("../services/user.Service");

// get a users details
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

// returns all users based on the speciied role. if role is not defined, returns all users
async function getUsers(req, res) {
  try {
    const role = req.params.role;
    const users = await userService.getUsers(role);
    if (!users) return res.status(404).json({ success: false, msg: "No users found" });
    const modifiedUsers = [];
    users.forEach((user) => {
      const {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        registration_date,
        updatedAt,
        profileImageUrl,
      } = user;
      let newuser = {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        registration_date,
        updatedAt,
        profileImageUrl,
      };
      modifiedUsers.push(newuser);
    });
    return res.json({ success: true, users: modifiedUsers, noOfUsers: modifiedUsers.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

// Allow user update their profile
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

// allow a user reset their password when they are logged in
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

// send password reset link to a users email
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

// allow a user reset password using the link sent to their email
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

async function searchUsers(req, res) {
  try {
    let searchParams = req.params.searchParam.toLowerCase().trim().split(" ");
    console.log(searchParams);
    const searchResults = await userService.searchUsers(searchParams);
    if (!searchResults || searchResults.length === 0)
      return res.status(404).json({ success: false, msg: "No user found" });
    return res.json({ success: true, result: searchResults, noOfResult: searchResults.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

// delete a users accound

module.exports = {
  getProfile,
  updateProfile,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
  getUsers,
  searchUsers,
};
