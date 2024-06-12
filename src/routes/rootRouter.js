const express = require("express");
const rootController = require("../controllers/root/rootController");
const router = express.Router();
// /v1/

console.log("in root router");
// routes
router.post("/login", rootController.loginEmployee);
router.delete("/logout", rootController.logoutUser);
router.get("/refresh", rootController.refreshAccessToken);
router.get("/counts", rootController.getCounts);

module.exports = router;
