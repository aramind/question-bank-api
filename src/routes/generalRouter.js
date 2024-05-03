const express = require("express");
const generalControllers = require("../controllers/general/generalControllers");
const router = express.Router();

console.log("in general router");
router.delete("/logout", generalControllers.logoutUser);

module.exports = router;
