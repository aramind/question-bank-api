const express = require("express");
const userController = require("../controllers/user/userController");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const registerUser = require("../controllers/auth/registerUser");
const router = express.Router();

console.log("User Router");
router.use(verifyRoles(["super"]));

router.get("", userController.getUser);
// router.post("", userController.addUser);
router.post("/register", registerUser);
router.patch("/:employeeId", userController.updateUser);
router.delete(
  "/:employeeId",

  userController.deleteUser
);

module.exports = router;
