const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");
require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../../utils/generateAccessToken");
const getRoles = require("../../utils/getRoles");

const handleRefreshToken = async (req, res) => {
  try {
    // console.log("REQ", req);
    // console.log("COOKIES", req.cookies);

    const refreshToken = req.cookies?.jwt;
    // console.log("REFRESHTOKEN", refreshToken);
    if (!refreshToken) {
      return sendResponse.failed(
        res,
        "Unauthorized dahil walang cookie",
        null,
        401
      );
    }
    const foundUser = await User.findOne({ "tokens.refresh": refreshToken });

    if (!foundUser) {
      return sendResponse.failed(res, "User not found", null, 404);
    }
    const returnedUserInfo = _.pick(foundUser, [
      "_id",
      "name",
      "username",
      "role",
      "status",
      "employeeId",
    ]);

    //   if there is user, verify the jwt
    jwt.verify(
      refreshToken,
      process.env.AUTH_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          throw err;
        } else {
          if (foundUser.username !== decoded.UserInfo.username) {
            return sendResponse.failed(res, "Unauthorized", null, 401);
          }
          sendResponse.success(
            res,
            "Refreshed successful",
            {
              ...returnedUserInfo,
              token: generateAccessToken(foundUser),
              role: getRoles.list[returnedUserInfo.role],
            },
            200
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    sendResponse.error(res, error, "Request error", 500);
  }
};
module.exports = handleRefreshToken;
