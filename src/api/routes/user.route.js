const router = require("express").Router();
const {
  allUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", allUsers);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
