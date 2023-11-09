const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      require: true,
    },
    asin: {
      type: String,
      require: true,
    },
    customer_reviews: {
      user_id: String,
      rateings_number: Number,
    },
    packer: {
      type: String,
      require: true,
    },
    importer: {
      type: String,
      require: true,
    },
    net_quantity: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductAdditionalInformation", schema);
