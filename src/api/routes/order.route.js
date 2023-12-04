const router = require("express").Router();
const { joyValidate } = require("../../validation/common.validation");
const {
  searchSchema,
  createOrderSchema,
  paymentSchema,
  shippingSchema
} = require("../../validation/order.validation");
const {
  allOrders,
  searchOrder,
  getOrder,
  createOrder,
  orderPayment,
  orderShippingDetail,
  orderConfirm,
  orderDelivered
} = require("../controllers/order.controller");

router.get("/", allOrders);
router.get("/search", joyValidate(searchSchema), searchOrder);
router.get("/:id", getOrder);
router.post("/create", joyValidate(createOrderSchema), createOrder);
router.post("/payment/success", joyValidate(paymentSchema), orderPayment);
router.post("/shipping/detail", joyValidate(shippingSchema), orderShippingDetail);
router.post("/confirm/:id", orderConfirm);
router.post("/delivered/:id", orderDelivered);

module.exports = router;
