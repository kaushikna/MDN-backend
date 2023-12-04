const router = require("express").Router();
const multer = require("multer");
const { validate, joyValidate } = require("../../validation/common.validation");
const {
  productSchema,
  productVariantSchema,
} = require("../../validation/product.validation");
const {
  allProducts,
  getProduct,
  getProductVariant,
  createProduct,
  createProductVariant,
  updateProduct,
  updateProductVariant,
  updateProductVariantImage,
  deleteProduct,
  deleteProductVariant
} = require("../controllers/product.controller");
const { storage } = require("../../helpers/util.helper");
const upload = multer({ storage: storage });


router.get("/", allProducts);
router.get("/:id", getProduct);
router.get("/variant/:id", getProductVariant);

router.post("/create", joyValidate(productSchema), createProduct);
router.post("/variant/create", upload.array("images", 20), joyValidate(productVariantSchema), createProductVariant);

router.put("/update/:id", joyValidate(productSchema), updateProduct);
router.put("/variant/update/:id", joyValidate(productVariantSchema), updateProductVariant);
router.put("/variant/:id/images/:index", upload.single("images"), updateProductVariantImage);

router.delete("/delete/:id", deleteProduct);
router.delete("/variant/delete/:id", deleteProductVariant);

module.exports = router;
