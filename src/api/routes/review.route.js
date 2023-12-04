const router = require("express").Router();
const multer = require("multer");
const { joyValidate } = require("../../validation/common.validation");
const { reviewSchema } = require("../../validation/product.validation");
const {
  productReview,
  createReview,
} = require("../controllers/review.controller");
const { storage } = require("../../helpers/util.helper");
const upload = multer({ storage: storage });

router.get("/:id", productReview);
router.post(
  "/create",
  upload.single("image"),
  joyValidate(reviewSchema),
  createReview
);

module.exports = router;
