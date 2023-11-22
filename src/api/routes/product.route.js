const router = require("express").Router();
const { validate } = require("../../validation/common.validation");
const {
  productSchema,
  productVariantSchema,
} = require("../../validation/product.validation");
const {
  allProducts,
  getProduct,
  getProductVariant,
  createProduct,
  // createProductVariant,
  // updateProduct,
  // updateProductVariant,
  // updateProductVariantImage,
  // deleteProduct,
  // deleteProductVariant
} = require("../controllers/product.controller");

router.get("/", allProducts);
router.get("/:id", getProduct);
router.get("/variant/:id", getProductVariant);

router.post("/create", validate(productSchema), createProduct);
// router.post("/variant/create", validate(productVariantSchema), createProductVariant);

// router.put("/update/:id", validate(productSchema), updateProduct);
// router.put("/variant/update/:id", validate(productVariantSchema), updateProductVariant);
// router.put("/variant/:id/images/:index", updateProductVariantImage);

// router.delete("/delete/:id", deleteProduct);
// router.delete("/variant/delete/:id", deleteProductVariant);

module.exports = router;
