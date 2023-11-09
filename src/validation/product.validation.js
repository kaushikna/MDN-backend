const { check } = require("express-validator");

const isproductcreate = [
  check("name").notEmpty().withMessage(" Name is required"),
  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isEmail()
    .withMessage("Valid Email required"),
  check("images").notEmpty().withMessage("images  is required"),
];

const isproductioninformation = [
  check("brand").notEmpty().withMessage("brand is required"),
  check("manufacturer").notEmpty().withMessage(" manufacturer is required"),
  check("model").notEmpty().withMessage(" model is required"),
  check("model_name").notEmpty().withMessage(" model_name is required"),
  check("model_year").notEmpty().withMessage(" model_year is required"),
  check("Includes_Rechargeable_battery")
    .notEmpty()
    .withMessage(" Includes_Rechargeable_battery is required"),
  check("voltage").notEmpty().withMessage(" voltage is required"),
  check("wattage").notEmpty().withMessage(" wattage is required"),
  check("power_source").notEmpty().withMessage(" power_source is required"),
  check("country_of_origin")
    .notEmpty()
    .withMessage(" Country_of_origin is required"),
  check("item_weight").notEmpty().withMessage(" item_weight is required"),
];

const isadditionalinformation = [
  check("product_id").notEmpty().withMessage("product_id is required"),
  check("asin").notEmpty().withMessage("asin is required"),
  check("packer").notEmpty().withMessage("packer is required"),
  check("importer").notEmpty().withMessage("importer is required"),
  check("net_quantity").notEmpty().withMessage("net_quantity is required"),
];

module.exports = {
  isproductcreate,
  isproductioninformation,
  isadditionalinformation,
};
