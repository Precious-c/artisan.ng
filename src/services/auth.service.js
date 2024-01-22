const { default: mongoose } = require("mongoose");
const User = require("../models/User.models");
const { comparePasswod } = require("./encryption.service");

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
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (err) {
    return err;
  }
}

async function login(userData) {
  try {
    const { email, password } = userData;
    const user = await User.findOne(email);
    return user;

    // const isMatch = await comparePasswod(password, user.password);
    // if (!isMatch) return "Invalid credentials";
    // const token = jwt.sign(user.id, JWT_SECRET, { expiresIn: "1h" });
    // user.token = token;
    // return user;
  } catch (err) {
    return err;
  }
}

module.exports = { createAccount, login };
