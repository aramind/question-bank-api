const express = require("express");
const authControllers = require("../controllers/auth/authControllers");
const authValidator = require("../validators/authValidators");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const verifyJWT = require("../middlewares/auth/verifyJWT");
// const registerUserValidator = require("../validators/registerUserValidator");
const validateRegisterUser = require("../middlewares/validations/validateRegisterUser");
const registerUserSchema = require("../middlewares/validations/registerUserSchema");
console.log("Entering auth router");
const router = express.Router();

router.get("/refresh", authControllers.handleRefreshToken);
router.post("/login", authValidator.loginValidator, authControllers.loginUser);
router.post(
  "/register",

  verifyJWT,
  verifyRoles(["super"]),
  // authValidator?.registerUserValidator,
  validateRegisterUser(registerUserSchema),
  authControllers.registerUser
);

module.exports = router;
