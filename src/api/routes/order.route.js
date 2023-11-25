const router = require("express").Router();
const { joyValidate } = require("../../validation/common.validation");
const { createOrderSchema } = require("../../validation/order.validation");
const {
  allOrders,
  getOrder,
  createOrder,
} = require("../controllers/order.controller");

router.get("/", allOrders);
router.get("/:id", getOrder);
router.post("/create", joyValidate(createOrderSchema), createOrder);

module.exports = router;
