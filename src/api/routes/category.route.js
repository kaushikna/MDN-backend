const router = require("express").Router();
const { validate } = require("../../validation/common.validation");
const { categorySchema } = require("../../validation/category.validation");
const {
  allCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/", allCategories);
router.post("/create", validate(categorySchema), createCategory);
router.put("/update/:id", validate(categorySchema), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
