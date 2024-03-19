const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

console.log("User Router");
router.get("", userController.getUser);
router.post("", userController.addUser);

module.exports = router;
