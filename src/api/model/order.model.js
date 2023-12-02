const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    order_no: {
      type: String,
      unique: false,
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
    total: {
      type: Number,
      required: true,
    },
    order_payment_id: {
      type: String,
      require: true,
    },
    payment_status: {
      type: String,
      require: true,
      enum: ["Pending", "Success"],
      default: "Pending",
    },
    order_items: [
      {
        product_variant_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productVariant",
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
    shipping_id: {
      type: String,
      require: false,
    },
    shipping_detail: {
      type: String,
      require: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", schema);
