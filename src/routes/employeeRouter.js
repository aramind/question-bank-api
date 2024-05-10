const express = require("express");
const employeeController = require("../controllers/employee/employeeController");
const router = express.Router();

console.log("in employee router");
console.log("hehe");

// /v1/employees

router.post("/register", employeeController?.register);
router.get("/:_id", employeeController?.getEmployees);
router.get("", employeeController?.getEmployees);

module.exports = router;
