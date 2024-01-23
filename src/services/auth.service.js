const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const { encrypt, comparePassword } = require("./encryption.service");

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
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) throw new Error("Email is already in use");

    userData.password = await encrypt(userData.password);

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
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ userID: user.id, userEmail: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userObject = user.toObject();
    // console.log("kk", userObject);
    delete userObject.password;
    // userObject.token = token;
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
