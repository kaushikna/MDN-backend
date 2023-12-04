const { StatusCodes } = require("http-status-codes");
const Review = require("../model/review.model");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const mongoose = require("mongoose");
const moment = require("moment");

const productReview = async (req, res) => {
  try {
    const productId = req.params.id;

    const allReviews = await Review.find({ product: productId });
    return res.status(StatusCodes.OK).json({
      message: "Fetch all reviews",
      data: allReviews,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { orderNo, productId, customer_review, customer_id } = req.body;
    const imageUrl = "/uploads/" + req.file.filename;

    const order = await Order.aggregate([
      {
        $match: {
          order_no: orderNo,
          user: new mongoose.Types.ObjectId(customer_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    if (!order[0]) {
      throw new Error("Order not found.");
    }

    let product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error("Product not found.");
    }

    let review = new Review({
      order: order[0]._id,
      product: productId,
      image: imageUrl,
      customer_review: customer_review,
      customer_id: customer_id,
      warranty_expired_date: moment(order[0].delivered_date).add(3, "years"),
    });
    review = await review.save();
    
    return res.status(StatusCodes.OK).json({
      message: "Create user review successfully",
      data: review,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  productReview,
  createReview,
};
