const express = require("express");
const authControllers = require("../controllers/auth/authControllers");
const authValidator = require("../validators/authValidators");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const verifyJWT = require("../middlewares/auth/verifyJWT");
console.log("Entering auth router");
const router = express.Router();

router.post("/login", authValidator.loginValidator, authControllers.loginUser);
router.post(
  "/register",
  verifyJWT,
  verifyRoles(["super"]),
  authValidator.registerUserValidator,
  authControllers.registerUser
);
router.get("/refresh", authControllers.handleRefreshToken);
module.exports = router;
