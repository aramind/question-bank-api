const { validationResult, matchedData } = require("express-validator");
const sendResponse = require("../../utils/sendResponse");
const getAllErrorMessages = require("../../utils/getAllErrorMessages");
const comparePassword = require("../../utils/comparePassword");
const User = require("../../models/User");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  console.log("in login controller");
  try {
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
      sendResponse.error(
        res,
        result.array(),
        getAllErrorMessages(result.array()),
        400
      );
      return;
    }

    console.log(matchedData(req));
    const { username, password } = matchedData(req);

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      sendResponse.failed(res, "Invalid credentials", null, 401);
      return;
    }

    const match = await comparePassword(password, foundUser.password);
    if (!match) {
      sendResponse.failed(res, "Invalid credentials", null, 401);
      return;
    } else {
      // create and attach jwt tokens
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

      const refreshToken = jwt.sign(
        limitedUserInfo,
        process.env.AUTH_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
      );

      foundUser.tokens.refresh = refreshToken;
      const updatedUser = await foundUser.save();
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      sendResponse.success(res, "Login Successful", accessToken, 200);
    }
  } catch (error) {
    console.error("Error logging in", error);
    sendResponse.error(res, error, "Error logging in", 500);
  }
};
module.exports = loginUser;
