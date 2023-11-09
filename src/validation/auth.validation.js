const { check } = require("express-validator");

const registerSchema = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid Email required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10 })
    .withMessage("Phone is must be 10 digit"),
];

const loginSchema = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Please Enter Valid Password"),
];

const verifySchema = [
  check("userId").notEmpty().withMessage("User id is required"),
  check("otp").notEmpty().isLength({ min: 6 }).withMessage("OTP is required"),
];

const resendSchema = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid Email required"),
];

const changePasswordSchema = [
  check("userId").notEmpty().withMessage("User id is required"),
  check("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Please Enter Valid Password"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Please Enter Valid Password"),
];

const forgotPasswordSchema = [
  check("userId").notEmpty().withMessage("User id is required"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Please Enter Valid Password"),
];

module.exports = {
  registerSchema,
  loginSchema,
  verifySchema,
  resendSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
