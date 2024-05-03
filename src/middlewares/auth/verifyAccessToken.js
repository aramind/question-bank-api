const jwt = require("jsonwebtoken");
const sendResponse = require("../../utils/sendResponse");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (!authHeader) {
    return sendResponse.failed(res, "Unknown Authorization", null, 401);
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          console.log("Refreshing...");
        }
        return sendResponse.error(res, err, "Unauthorize access", 403);
      }
      req.userInfo = decoded.UserInfo;
      // console.log("DECODED", decoded);
      console.log(req.userInfo);
      next();
    });
  }
};

module.exports = verifyJWT;
