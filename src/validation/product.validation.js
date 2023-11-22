const { check } = require("express-validator");

const productSchema = [
  check("name").notEmpty().withMessage("Product Name is required"),
  check("categoryId").notEmpty().withMessage("Category Id is required"),
];

const productVariantSchema = [
  check("price").notEmpty().withMessage("Category Name is required"),
];

module.exports = {
  productSchema,
  productVariantSchema,
};
