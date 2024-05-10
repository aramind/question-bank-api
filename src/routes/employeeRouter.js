const express = require("express");
const employeeController = require("../controllers/employee/employeeController");
const router = express.Router();

console.log("in employee router");

// /v1/employees

router.post("/register", employeeController?.register);
<<<<<<< HEAD
router.get("/:_id", employeeController?.getEmployees);
=======
>>>>>>> a57a06ce887018d5cbdddf6abccf2bc2e4a3a590
router.get("", employeeController?.getEmployees);

module.exports = router;
