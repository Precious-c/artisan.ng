const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const ServiceProvider = require("../models/ServiceProvider.Models");
const { encrypt, comparePassword } = require("./encryption.service");
const deletePassword = require("../utils/helpers/deletePassword");

// async function createAccount(model) {
//   const session = await mongoose.startSession();
//   const result = await session.withTransaction(async () => {
//     model.createdAt = Date.now();
//     const user = new User(model);
//     await user.save({ session });
//   });
// }

async function createAccount(userData) {
  try {
    console.log(userData);
    const userExists = await User.findOne({ email: userData.email });
    if (!userExists) {
      const serviceProviderExists = await ServiceProvider.findOne({ email: userData.email });
      if (serviceProviderExists) throw new Error("Email is already in use");
    }

    userData.password = await encrypt(userData.password);

    if (userData.role === "service_provider") {
      const newUser = new ServiceProvider(userData);
      await newUser.save();
      return newUser;
    }
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function login(userData) {
  try {
    const { email, password } = userData;
    let user = await User.findOne({ email });
    if (!user) {
      user = await ServiceProvider.findOne({ email });
    }
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ userID: user.id, userEmail: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userObject = deletePassword(user);
    return { userObject, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// async function logout(userData) {
//   try {

//     return userObject;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

module.exports = { createAccount, login };
