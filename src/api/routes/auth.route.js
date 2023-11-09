const router = require("express").Router();
const { validate } = require("../../validation/common.validation");
const {
  loginSchema,
  registerSchema,
  verifySchema,
  resendSchema,
  changePasswordSchema,
  forgotPasswordSchema
} = require("../../validation/auth.validation");
const {
  logIn,
  register,
  verifyOTP,
  resendOTP,
  changePassword,
  forgotPassword,
} = require("../controllers/auth.controller");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), logIn);
router.post("/verify-otp", validate(verifySchema), verifyOTP);
router.post("/resend-otp", validate(resendSchema), resendOTP);
router.put("/change-password", validate(changePasswordSchema), changePassword);
router.put("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

module.exports = router;
