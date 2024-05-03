const express = require("express");
const authControllers = require("../controllers/auth/authControllers");
const authValidator = require("../validators/authValidators");
const verifyJWT = require("../middlewares/auth/verifyAccessToken");
console.log("Entering auth router");
const router = express.Router();

router.post("/login", authValidator.loginValidator, authControllers.loginUser);
router.post(
  "/register",
  verifyJWT,
  authValidator.registerUserValidator,
  authControllers.registerUser
);
router.get("/refresh", authControllers.handleRefreshToken);
module.exports = router;
