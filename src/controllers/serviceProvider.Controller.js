const { validationResult } = require("express-validator");
const providerService = require("../services/serviceProvider.Service");
const deletePassword = require("../utils/helpers/deletePassword");

// returns all service providers
async function getServiceProviders(req, res) {
  try {
    const serviceProviders = await providerService.getServiceProviders();
    if (!serviceProviders || serviceProviders.length === 0)
      return res.status(404).json({ success: false, msg: "No service providers found" });
    const modifiedServiceProviders = [];
    // loop through each Object and delete the password field
    serviceProviders.forEach((serviceProvider) => {
      const serviceProviderObject = deletePassword(serviceProvider);
      modifiedServiceProviders.push(serviceProviderObject);
    });
    return res.json({
      success: true,
      serviceProviders: modifiedServiceProviders,
      noOfServiceProviders: modifiedServiceProviders.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

// get logged in service provider's details
async function getProfile(req, res) {
  try {
    const userId = req.userId;
    let user = await providerService.getServiceProvider(userId);
    if (!user) return res.status(404).json({ success: false, msg: "Service Provider not found" });
    console.log(user);
    const modifiedUser = deletePassword(user);
    return res.json({ success: true, user: modifiedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    let serviceProvider = await providerService.getServiceProvider(id);
    if (!serviceProvider)
      return res.status(404).json({ success: false, msg: "Service Provider not found" });
    const modifiedServiceProviderObj = deletePassword(serviceProvider);
    return res.json({ success: true, serviceProvider: modifiedServiceProviderObj });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

// update service provider profile
async function updateProfile(req, res) {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0)
      return res.status(400).json({ success: false, msg: errors.errors });

    const userId = req.userId;
    const body = req.body;

    const user = deletePassword(await providerService.updateProfile(userId, body));

    return res.json({ success: true, user });
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
    const status = await providerService.resetPassword(userId, body);
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
    const done = await providerService.forgotPassword(email);
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

    const done = await providerService.resetForgotPassword(userId, token, newPassword);
    if (done) return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

async function searchServiceProviders(req, res) {
  try {
    // get search parameters, remove whitespaces, convert to lowercase and and split into an array
    let searchParams = req.params.searchParam.toLowerCase().trim().split(" ");
    console.log(searchParams);

    // get search results users from db
    const searchResults = await providerService.searchServiceProviders(searchParams);
    if (!searchResults || searchResults.length === 0)
      return res.status(404).json({ success: false, msg: "No service provider found" });

    return res.json({ success: true, result: searchResults, noOfResult: searchResults.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
}

// delete a users accound

module.exports = {
  getServiceProviders,
  getProfile,
  getUser,
  updateProfile,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
  searchServiceProviders,
};
