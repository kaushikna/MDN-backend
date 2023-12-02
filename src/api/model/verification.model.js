const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    otp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", schema);
