const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  customer_id: String,
  replay: String,
  email: String,
  created_at: Date,
  expires_at: Date,
});

// create db collection
module.exports = mongoose.model("InquiryReplay", schema);
