const { check } = require("express-validator");

const createInquirySchema = [
  check("fullName").notEmpty().withMessage("First Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid Email required"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10 })
    .withMessage("Phone is must be 10 digit"),
  check("comment").notEmpty().withMessage("Information is required"),
];

module.exports = {
  createInquirySchema,
};
