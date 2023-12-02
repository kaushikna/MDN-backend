const router = require("express").Router();
const { joyValidate } = require("../../validation/common.validation");
const {
  createOrderSchema,
  paymentSchema,
} = require("../../validation/order.validation");
const {
  allOrders,
  getOrder,
  createOrder,
  orderPayment
} = require("../controllers/order.controller");

router.get("/", allOrders);
router.get("/:id", getOrder);
router.post("/create", joyValidate(createOrderSchema), createOrder);
router.post("/payment/success", joyValidate(paymentSchema), orderPayment);

module.exports = router;
