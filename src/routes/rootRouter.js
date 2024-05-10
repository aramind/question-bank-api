const express = require("express");
const authValidator = require("../validators/authValidators");
const router = express.Router();
// /v1/

console.log("in root router");
// routes
router.post("/login");

module.exports = router;
