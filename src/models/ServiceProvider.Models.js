const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "service_provider",
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: [true, "Please enter a business name"],
      unique: true,
    },
    businessDescription: {
      type: String,
      required: [true, "Please enter a business description"],
    },
    availability: {
      days: [{ type: String }],
      startTime: { type: String }, //e.g., "09:00 AM"
      endTime: { type: String }, //e.g., "07:00 PM"
    },
    services: {
      type: Array,
      required: [true, "Please enter at least one service"],
    },
    bookingHistory: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
    },
    businessIsVerified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);
ServiceProviderSchema.index({ businessName: 1 });
module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);
