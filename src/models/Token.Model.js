const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 900,
  },
  //   },
  //   { timestamps: true },
  //   {
  //     toJSON: {
  //       transform: (doc, ret) => {
  //         ret.id = ret._id.toString();
  //         delete ret._id;
  //         delete ret.__v;
  //         // delete ret.password;
  //       },
  //     },
});

module.exports = mongoose.model("Token", tokenSchema);
