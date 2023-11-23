const router = require("express").Router();
const { validate } = require("../../validation/common.validation");
const { createOrderSchema } = require("../../validation/order.validation");
const { createOrder, updateOrder } = require("../controllers/order.controller");

router.post("/create", validate(createOrderSchema), createOrder);
router.put("/update/:id", updateOrder);

module.exports = router;
