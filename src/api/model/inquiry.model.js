const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    contact_number: {
      type: String,
      require: true,
      min: 10,
    },
    comment: {
      type: String,
      require: true,
    },
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", schema);
