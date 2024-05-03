const jwt = require("jsonwebtoken");
const sendResponse = require("../../utils/sendResponse");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (!authHeader) {
    sendResponse.failed(res, "Unknown Authorization", null, 401);
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) sendResponse.error(res, err, "Unauthorize access", 403);
      req.user = decoded;
      // console.log("DECODED", decoded);
      next();
    });
  }
};

module.exports = verifyJWT;
