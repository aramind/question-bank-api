const express = require("express");
const userController = require("../controllers/user/userController");
const router = express.Router();

console.log("User Router");
router.get("", userController.getUser);
router.post("", userController.addUser);

module.exports = router;
