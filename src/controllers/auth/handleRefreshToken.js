const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");
require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

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
          console.log("ERROR", err);
          throw err;
        } else {
          if (foundUser.username !== decoded.username) {
            return sendResponse.failed(res, "Unauthorized", null, 401);
          }

          const limitedUserInfo = _.pick(foundUser, [
            "_id",
            "name",
            "email",
            "username",
            "role",
            "status",
            "employeeId",
          ]);

          const accessToken = jwt.sign(
            limitedUserInfo,
            process.env.AUTH_ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
          );

          return sendResponse.success(res, "Refreshed", accessToken, 200);
        }
      }
    );
  } catch (error) {
    sendResponse.error(res, error, "Request error", 500);
  }
};
module.exports = handleRefreshToken;
