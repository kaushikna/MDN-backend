const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color_name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  color_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ProductVariant", schema);
