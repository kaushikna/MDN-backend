const { StatusCodes } = require("http-status-codes");
const Order = require("../model/order.model");
const User = require("../model/user.model");
const ProductVariant = require("../model/productVariant.model");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const moment = require("moment");

const allOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();

    return res.status(StatusCodes.OK).json({
      message: "Fetch all Order",
      data: allOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new Error("Order not found.");
    }

    return res.status(StatusCodes.OK).json({
      message: "Fetch order successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, orderItems, address } = req.body;

    let user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User Not found.");
    }

    const productVariantIds = [];
    let total = 0;
    orderItems.forEach((item) => {
      productVariantIds.push(
        new mongoose.Types.ObjectId(item.product_variant_id)
      ),
        (total += item.price * item.quantity);
    });
    let productVariants = await ProductVariant.find({
      _id: { $in: productVariantIds },
    });
    if (productVariants.length !== productVariantIds.length) {
      throw new Error("Please start with fresh, some item are not found.");
    }

    const instance = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    let order = new Order({
      user: userId,
      total: total,
      order_items: orderItems,
      address: address,
    });
    order = await order.save();

    const createOrder = await instance.orders.create({
      amount: +total,
      currency: "INR",
      receipt: `receipt_${order.order_no}`,
    });
    return res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      data: {
        order: order,
        orderData: createOrder,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const orderPayment = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId } = req.body;

    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new Error("Order not found.");
    }
    order.order_payment_id = razorpayPaymentId;
    order.payment_status = "Success";
    order = await order.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Payment successful",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const searchOrder = async (req, res) => {
  try {
    const { formDate, toDate } = req.body;

    let orders = await Order.find({
      createdAt: {
        $gte: moment(formDate).startOf("day"),
        $lte: moment(toDate).endOf("day"),
      },
    }).sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      message: "Fetch all Order",
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const orderConfirm = async (req, res) => {
  try {
    const orderId = req.params.id;

    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new Error("Order not found.");
    }

    order["order_status"] = "Confirmed";
    order = await order.save();

    return res.status(StatusCodes.OK).json({
      message: "Your order confirm successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const orderShippingDetail = async (req, res) => {
  try {
    const { orderId, packingId, details } = req.body;

    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new Error("Order not found.");
    }

    order["shipping_id"] = packingId;
    order["shipping_detail"] = details;
    order = await order.save();

    return res.status(StatusCodes.OK).json({
      message: "Order shipping detail add successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  allOrders,
  getOrder,
  createOrder,
  orderPayment,
  searchOrder,
  orderConfirm,
  orderShippingDetail
};
