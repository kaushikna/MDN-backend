const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  order_no: {
    type: String,
    unique: true,
    default: () =>
      Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  },
  order_status: {
    type: String,
    require: true,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
  address: {
    house_no: {
      type: String,
      require: true,
    },
    street_name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    pin_code: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
  },
});

module.exports = mongoose.model("Order", schema);
