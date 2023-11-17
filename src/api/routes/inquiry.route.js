const router = require("express").Router();
const { validate } = require("../../validation/common.validation");
const {
  createInquirySchema,
  inquiryReplaySchema,
} = require("../../validation/inquiry.validation");
const {
  allInquiries,
  createInquiry,
  inquiryReplay,
} = require("../controllers/inquiry.controller");

router.get("/", allInquiries);
router.post("/create", validate(createInquirySchema), createInquiry);
router.post("/replay", validate(inquiryReplaySchema), inquiryReplay);

module.exports = router;
