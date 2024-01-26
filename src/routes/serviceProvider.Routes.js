const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();
const serviceProviderController = require("../controllers/serviceProvider.Controller");
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../utils/validations/userValidation");
const { admin } = require("../middlewares/ensureRole");
// const { convertToLowercase } = require("../middlewares/stringToLowercase");

router.get("/", auth, admin, serviceProviderController.getServiceProviders); //get all service providers
router.get("/profile", auth, serviceProviderController.getProfile); //get logged in user's proile
router.get("/profile/:id", serviceProviderController.getUser);
router.put("/profile", auth, updateProfileValidation, serviceProviderController.updateProfile);
router.put(
  "/reset-password",
  auth,
  changePasswordValidation,
  serviceProviderController.resetPassword
);
router.post(
  "/reset-password/:userId/:token",
  changePasswordValidation,
  serviceProviderController.resetForgotPassword
);
router.post("/forgot-password", serviceProviderController.forgotPassword);
router.get("/search/:searchParam", serviceProviderController.searchServiceProviders);

router.get("/services", auth, serviceProviderController.getServices);
router.post("/services/add", auth, serviceProviderController.addService);
router.post("/services/remove", auth, serviceProviderController.removeService);

router.get("/availability", auth, serviceProviderController.getAvailability);
// Get Booking Requests
// router.get("/bookings", auth, serviceProviderController.getServices);
//Respond to Booking Request: Updates the status of a booking request (accept, reject, reschedule).
// router.put("/bookings", auth, serviceProviderController.getServices);
// router.get("/messages", auth, serviceProviderController.getServices);
// router.get("/reviews", auth, serviceProviderController.getServices);
// router.get("/invoices", auth, serviceProviderController.getServices);

module.exports = router;
