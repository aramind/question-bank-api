const express = require("express");
const authControllers = require("../controllers/auth/authControllers");
const authValidator = require("../validators/authValidators");
console.log("Entering auth router");
const router = express.Router();

router.post("/login", authValidator.loginValidator, authControllers.loginUser);
router.post(
  "/register",
  authValidator.registerUserValidator,
  authControllers.registerUser
);
module.exports = router;
