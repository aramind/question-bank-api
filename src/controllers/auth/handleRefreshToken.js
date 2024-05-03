const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");
require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../../utils/generateAccessToken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    // console.log("COOKIES", cookies);
    if (!cookies?.jwt) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ "tokens.refresh": refreshToken });

    if (!foundUser) {
      return sendResponse.failed(res, "User not found", null, 404);
    }
    //   if there is user, verify the jwt
    // Verify the JWT
    jwt.verify(
      refreshToken,
      process.env.AUTH_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          // console.log("ERROR", err);
          throw err;
        } else {
          // console.log(decoded);
          if (foundUser.username !== decoded.UserInfo.username) {
            return sendResponse.failed(res, "Unauthorized", null, 401);
          }

          return sendResponse.success(
            res,
            "Refreshed",
            generateAccessToken(foundUser),
            200
          );
        }
      }
    );
  } catch (error) {
    sendResponse.error(res, error, "Request error", 500);
  }
};
module.exports = handleRefreshToken;
