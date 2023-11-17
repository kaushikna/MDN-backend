const { check } = require("express-validator");

const createOrderSchema = [
  check("houseNo").notEmpty().withMessage("House No is required"),
  check("streetName").notEmpty().withMessage("Street Name No is required"),
  check("nearlocation").notEmpty().withMessage("Near Location No is required"),
  check("pincode").notEmpty().withMessage("Pincode is required"),
  check("state").notEmpty().withMessage("state is required"),
  check("city").notEmpty().withMessage("city is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("netQuantity")
    .notEmpty()
    .withMessage("netQuantity is required")
    .isLength({ min: 1 })
    .withMessage("netQuantity Must 1 character long")
    .isLength({ max: 6 })
    .withMessage("netQuantity Must 6 character long"),
];

module.exports = {
  createOrderSchema,
};
