const mongoose = require("mongoose");
const { Role } = require("../enums/user.enums");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
    // createdAt: {
    //   type: Date,
    // },
    role: {
      type: String,
      required: true,
      default: Role.USER,
    },
    profileImageUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
