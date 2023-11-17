const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  product_id: {
    type: String,
  },
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
  net_quantity: {
    type: String,
    require: true,
    min: 1,
    max: 5,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  product_details: {
    type: Object,
  },
  user_details: {
    type: Object,
  },
});

module.exports = mongoose.model("Order", schema);
