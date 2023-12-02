const { check } = require("express-validator");
const Joy = require("joi");

const productSchema = Joy.object()
  .keys({
    name: Joy.string().required(),
    categoryId: Joy.string().required(),
    price: Joy.number().required(),
    additionalInformation: Joy.object()
      .keys({
        manufacturer: Joy.string().required(),
        packer: Joy.string().required(),
        importer: Joy.string().required(),
        item_weight: Joy.string().required(),
        net_quantity: Joy.string().required(),
        components: Joy.string().required(),
        generic_name: Joy.string().required(),
        seller_rank: Joy.string().required(),
      })
      .unknown()
      .required(),
    technicalInformation: Joy.object()
      .keys({
        brand: Joy.string().required(),
        electric_design: Joy.string().required(),
        power_source: Joy.string().required(),
        style: Joy.string().required(),
        dimensions: Joy.string().required(),
        room_type: Joy.string().required(),
        feature: Joy.string().required(),
        recommended_product: Joy.string().required(),
        wattage: Joy.number().required(),
        finish_type: Joy.string().required(),
        number_of_blades: Joy.number().required(),
        capacity: Joy.string().required(),
        speed: Joy.string().required(),
        voltage: Joy.string().required(),
        collection_name: Joy.string().required(),
        switch_type: Joy.string().required(),
        weight: Joy.string().required(),
        usage: Joy.string().required(),
        model_name: Joy.string().required(),
        specification_met: Joy.string().required(),
        control: Joy.string().required(),
        light_type: Joy.string().required(),
        blade_material: Joy.string().required(),
        manufacturer: Joy.string().required(),
        country_of_origin: Joy.string().required(),
        model_number: Joy.string().required(),
        asin: Joy.string().required(),
      })
      .unknown()
      .required(),
  })
  .unknown();

const productVariantSchema = Joy.object()
  .keys({
    productId: Joy.string().required(),
    colorName: Joy.string().required(),
    colorCode: Joy.string().required()
  })
  .unknown();

module.exports = {
  productSchema,
  productVariantSchema,
};
