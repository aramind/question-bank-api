const express = require("express");
const userController = require("../controllers/user/userController");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const router = express.Router();

console.log("User Router");
router.use(verifyRoles(["super"]));

router.get("", userController.getUser);
router.post("", userController.addUser);
router.patch("/:employeeId", userController.updateUser);
router.delete(
  "/:employeeId",

  userController.deleteUser
);

module.exports = router;
