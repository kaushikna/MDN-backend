const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Product = require("../model/product.model");
const ProductVariant = require("../model/productVariant.model");
const Category = require("../model/category.model");

const allProducts = async (req, res) => {
  try {
    const allProducts = await Product.aggregate([
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "productVariants",
        },
      },
    ]);
    return res.status(StatusCodes.OK).json({
      message: "Fetch all Product",
      data: allProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "productVariants",
        },
      },
    ]);

    if (!product) {
      throw new Error("Product not found.");
    }

    return res.status(StatusCodes.OK).json({
      message: "Fetch Product successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const getProductVariant = async (req, res) => {
  try {
    const variantId = req.params.id;

    let productVariant = await ProductVariant.findOne({
      _id: variantId,
    });
    if (!productVariant) {
      throw new Error("Product Variant not found.");
    }

    return res.status(StatusCodes.OK).json({
      message: "Fetch Variant successfully",
      data: productVariant,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    let productExist = await Product.findOne({ name });
    if (productExist) {
      throw new Error("Product with same name already exist.");
    }

    let category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throw new Error("Invalid category id.");
    }

    let product = new Product({ name, category: categoryId });
    product = await product.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const createProductVariant = async (req, res) => {
  try {
    const { price, productId } = req.body;

    let productVariant = new ProductVariant({ price, product: productId });
    productVariant = await productVariant.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  allProducts,
  getProduct,
  getProductVariant,
  // getSearchProduct,
  createProduct,
  createProductVariant,
  // updateProduct,
  // updateProductVariant,
  // updateProductVariantImage,
  // deleteProduct,
  // deleteProductVariant,
};
