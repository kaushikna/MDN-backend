const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Product = require("../model/product.model");
const ProductVariant = require("../model/productVariant.model");
const Category = require("../model/category.model");
const fs = require("fs");
const path = require("path");

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
    const {
      name,
      categoryId,
      price,
      additionalInformation,
      technicalInformation,
    } = req.body;

    let productExist = await Product.findOne({ name });
    if (productExist) {
      throw new Error("Product with same name already exist.");
    }

    let category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throw new Error("Invalid category id.");
    }

    let product = new Product({
      name,
      category: categoryId,
      price,
      additional_information: additionalInformation,
      technical_information: technicalInformation,
    });
    product = await product.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
      data: product,
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
    const { productId, colorName, colorCode } = req.body;
    const imageUrls = req.files.map((file) => "/uploads/" + file.filename);

    let productExist = await Product.findOne({ _id: productId });
    if (!productExist) {
      throw new Error("Product not found.");
    }

    let productVariant = new ProductVariant({
      product: productId,
      color_name: colorName,
      color_code: colorCode,
      images: imageUrls,
    });
    productVariant = await productVariant.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Product variant created successfully",
      data: productVariant,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      categoryId,
      price,
      additionalInformation,
      technicalInformation,
    } = req.body;
    const productId = req.params.id;

    let productExist = await Product.findOne({
      _id: { $not: { $eq: productId } },
      name,
    });
    if (productExist) {
      throw new Error("Product with same name already exist.");
    }

    let product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error("Product not found.");
    }

    let category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throw new Error("Invalid category id.");
    }

    product["name"] = name;
    product["category"] = categoryId;
    product["price"] = price;
    product["additional_information"] = additionalInformation;
    product["technical_information"] = technicalInformation;

    product = await product.save();

    return res.status(StatusCodes.OK).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const updateProductVariant = async (req, res) => {
  try {
    const { productId, colorName, colorCode } = req.body;
    const productVariantId = req.params.id;

    let productExist = await Product.findOne({ _id: productId });
    if (!productExist) {
      throw new Error("Product not found.");
    }

    let productVariant = await ProductVariant.findOne({
      _id: productVariantId,
    });
    if (!productVariant) {
      throw new Error("Product Variant not found.");
    }

    productVariant["product"] = productId;
    productVariant["color_name"] = colorName;
    productVariant["color_code"] = colorCode;

    productVariant = await productVariant.save();

    return res.status(StatusCodes.OK).json({
      message: "Product variant updated successfully",
      data: productVariant,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const updateProductVariantImage = async (req, res) => {
  try {
    const variantId = req.params.id;
    const imageIndex = req.params.index;
    const { filename } = req.file;

    let product = await ProductVariant.findOne({ _id: variantId });
    if (!product) {
      throw new Error("Product variant not found.");
    }

    if (imageIndex < 0 || imageIndex >= product.images.length) {
      throw new Error("Invalid image index.");
    }

    fs.unlink(
      path.join(__dirname, "../../../", product.images[imageIndex]),
      (err) => {
        if (err) {
          return;
        }
      }
    );

    product.images[imageIndex] = `/uploads/${filename}`;

    product = await product.save();

    return res.status(StatusCodes.OK).json({
      message: "Product variant image updated successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductVariant.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      message: "ProductVariant deleted successfully",
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
  createProduct,
  createProductVariant,
  updateProduct,
  updateProductVariant,
  updateProductVariantImage,
  deleteProduct,
  deleteProductVariant,
};
