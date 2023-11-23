const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", schema);
