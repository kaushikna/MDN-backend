const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  images: { type: [String], required: true },
});

module.exports = mongoose.model("Product", schema);
