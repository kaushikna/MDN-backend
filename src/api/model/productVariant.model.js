const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // images: {
  //   type: [String],
  //   required: true,
  // },
  // additional_information: {
  //   manufacturer: {
  //     type: String,
  //     require: true,
  //   },
  //   packer: {
  //     type: String,
  //     require: true,
  //   },
  //   importer: {
  //     type: String,
  //     require: true,
  //   },
  //   item_weight: {
  //     type: String,
  //     require: true,
  //   },
  //   net_quantity: {
  //     type: String,
  //     require: true,
  //   },
  //   components: {
  //     type: String,
  //     require: true,
  //   },
  //   generic_name: {
  //     type: String,
  //     require: true,
  //   },
  //   seller_rank: {
  //     type: String,
  //     require: true,
  //   },
  // },
  // technical_information: {
  //   brand: {
  //     type: String,
  //     require: true,
  //   },
  //   color: {
  //     type: String,
  //     require: true,
  //   },
  //   electric_design: {
  //     type: String,
  //     require: true,
  //   },
  //   power_source: {
  //     type: String,
  //     require: true,
  //   },
  //   style: {
  //     type: String,
  //     require: true,
  //   },
  //   dimensions: {
  //     type: String,
  //     require: true,
  //   },
  //   room_type: {
  //     type: String,
  //     require: true,
  //   },
  //   feature: {
  //     type: String,
  //     require: true,
  //   },
  //   recommended_product: {
  //     type: String,
  //     require: true,
  //   },
  //   wattage: {
  //     type: Number,
  //     require: true,
  //   },
  //   finish_type: {
  //     type: String,
  //     require: true,
  //   },
  //   number_of_blades: {
  //     type: Number,
  //     require: true,
  //   },
  //   capacity: {
  //     type: String,
  //     require: true,
  //   },
  //   speed: {
  //     type: String,
  //     require: true,
  //   },
  //   voltage: {
  //     type: String,
  //     require: true,
  //   },
  //   collection_name: {
  //     type: String,
  //     require: true,
  //   },
  //   switch_type: {
  //     type: String,
  //     require: true,
  //   },
  //   weight: {
  //     type: String,
  //     require: true,
  //   },
  //   usage: {
  //     enum: ["Indoor", "Outdoor"],
  //     type: String,
  //     require: true,
  //   },
  //   model_name: {
  //     type: String,
  //     require: true,
  //   },
  //   specification_met: {
  //     type: String,
  //     require: true,
  //   },
  //   control: {
  //     type: String,
  //     require: true,
  //   },
  //   light_type: {
  //     type: String,
  //     require: true,
  //   },
  //   blade_material: {
  //     type: String,
  //     require: true,
  //   },
  //   manufacturer: {
  //     type: String,
  //     require: true,
  //   },
  //   country_of_origin: {
  //     type: String,
  //     require: true,
  //   },
  //   model_number: {
  //     type: String,
  //     require: true,
  //   },
  //   asin: {
  //     type: String,
  //     require: true,
  //   },
  // },
});

module.exports = mongoose.model("ProductVariant", schema);
