const { check } = require("express-validator");

const categorySchema = [
  check("name").notEmpty().withMessage("Category Name is required"),
];

module.exports = {
  categorySchema,
};
