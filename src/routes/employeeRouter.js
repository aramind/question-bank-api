const express = require("express");
const employeeController = require("../controllers/employee/employeeController");
const router = express.Router();

console.log("in employee router");

// /v1/employees

router.post("/register", employeeController?.register);
router.get("/:_id", employeeController?.getEmployees);
router.patch("/:_id", employeeController?.updateEmployee);
router.get("", employeeController?.getEmployees);

module.exports = router;
