const express = require("express");
const { register } = require("../controllers/employee/employeeController");
const router = express.Router();

console.log("in employee router");

// /v1/employees

router.post("/register", register);

module.exports = router;
