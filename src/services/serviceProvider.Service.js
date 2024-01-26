const crypto = require("crypto");
const { encrypt, comparePassword } = require("./encryption.service");
const Token = require("../models/Token.Model");
const sendMail = require("../utils/helpers/sendMail");
const ServiceProvider = require("../models/ServiceProvider.Models");

// return service provider by id
async function getServiceProvider(userId) {
  return await ServiceProvider.findById(userId);
}

//returns all service providers
async function getServiceProviders() {
  return await ServiceProvider.find();
}

// update a logged in service provider's profile
async function updateProfile(userId, reqBody) {
  try {
    const user = await ServiceProvider.findByIdAndUpdate(
      userId,
      {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        phoneNumber: reqBody.phoneNumber,
        address: reqBody.address,
        profileImageUrl: reqBody.profileImageUrl,
        businessName: reqBody.businessName,
        businessDescription: reqBody.businessDescription,
        availability: reqBody.availability,
        services: reqBody.services,
      },
      { new: true }
    );
    return user;
  } catch (err) {
    throw err;
  }
}

// resets logged in user's password
async function resetPassword(userId, reqBody) {
  try {
    const { currentPassword, newPassword } = reqBody;
    const user = await ServiceProvider.findById(userId);
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) throw new Error("Invalid Password");
    const hashedPassword = await encrypt(newPassword);
    user.password = hashedPassword;
    await user.save();

    console.log(user.firstName + " password changed");
    return true;
  } catch (err) {
    throw err;
  }
}

// generates and sends password reset link to email
async function forgotPassword(userEmail) {
  try {
    const user = await ServiceProvider.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");
    // generate unique verification token
    const emailVerificatonToken = await Token.create({
      userId: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    // generate password reset message with link
    const link = `Hello ${user.firstName}\nWe received a request to reset your password.\nPlease click on the link below to reset your password. ${process.env.BASE_URL}/reset-password/${user.id}/${emailVerificatonToken.token} \n\nThis link will be invalid in 15 minutes`;
    const status = await sendMail(user.email, "Artisan.ng: Password reset", link);

    if (status) return true;
  } catch (err) {
    throw err;
  }
}

async function resetForgotPassword(userId, token, newPassword) {
  try {
    const user = await ServiceProvider.findById(userId);
    if (!user) throw new Error("User not found");

    const verifiedToken = await Token.findOne({ userId: user.id, token });
    //check i token exists or is expired
    if (!verifiedToken) throw new Error("Token expired, try again");
    // Hash new password
    const hashedPassword = await encrypt(newPassword);
    // save hashed password to user Object
    user.password = hashedPassword;
    // saved modified object to db
    await user.save();

    return true;
  } catch (err) {
    throw err;
  }
}

// searches service providers by name and business name
async function searchServiceProviders(searchParams) {
  try {
    const users = await getServiceProviders();
    const searchResults = [];
    users.forEach((user) => {
      searchParams.forEach((param) => {
        if (param === user.firstName.toLowerCase() || param === user.lastName.toLowerCase())
          searchResults.push(user);
        const busNameArray = user.businessName.split(" ");
        busNameArray.forEach((item) => {
          if (param === item.toLowerCase() || param === item.toLowerCase())
            searchResults.push(user);
        });
      });
    });
    // remove dublicates
    const uniqueSearchResults = searchResults.filter((value, index) => {
      return searchResults.indexOf(value) === index;
    });
    return uniqueSearchResults;
  } catch (err) {
    throw err;
  }
}

async function getServices(userId) {
  try {
    const user = await ServiceProvider.findById(userId);
    return user.services;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addService(userId, service) {
  try {
    user = await ServiceProvider.findById(userId);
    if (user.services.includes(service)) throw new Error("Service already exists");
    user.services.push(service);
    await user.save();

    return user.services;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function removeService(userId, service) {
  try {
    user = await ServiceProvider.findById(userId);
    if (!user.services.includes(service)) throw new Error("Service doesn't exists");
    const index = user.services.indexOf(service);
    user.services.splice(index, 1);
    await user.save();
    console.log(user.services);
    return user.services;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAvailability(userId) {
  try {
    const user = await ServiceProvider.findById(userId);
    return user.availability;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = {
  getServiceProvider,
  updateProfile,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
  getServiceProviders,
  searchServiceProviders,
  getServices,
  addService,
  getAvailability,
  removeService,
};
