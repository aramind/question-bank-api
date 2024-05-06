const { validationResult, matchedData } = require("express-validator");
const sendResponse = require("../../utils/sendResponse");
const getAllErrorMessages = require("../../utils/getAllErrorMessages");
const comparePassword = require("../../utils/comparePassword");
const User = require("../../models/User");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const getRoles = require("../../utils/getRoles");
const generateAccessToken = require("../../utils/generateAccessToken");
const generateRefreshToken = require("../../utils/generateRefreshToken");
require("dotenv").config();

const loginUser = async (req, res) => {
  // console.log("in login controller");
  try {
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
      return sendResponse.error(
        res,
        result.array(),
        getAllErrorMessages(result.array()),
        400
      );
    }

    console.log(matchedData(req));
    const { username, password } = matchedData(req);

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return sendResponse.failed(res, "Invalid credentials", null, 401);
    }

    const match = await comparePassword(password, foundUser.password);
    if (!match) {
      return sendResponse.failed(res, "Invalid credentials", null, 401);
    } else {
      // create and attach jwt tokens
      const accessToken = generateAccessToken(foundUser);
      const refreshToken = generateRefreshToken(foundUser);

      foundUser.tokens.refresh = refreshToken;
      const updatedUser = await foundUser.save();
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        // maxAge: 15 * 1000,
        // maxAge: 10 * 1000,
      });

      const returnedUserInfo = _.pick(foundUser, [
        "_id",
        "name",
        "username",
        "role",
        "status",
        "employeeId",
      ]);

      // console.log("RES COKIE:", res.getHeaders());
      sendResponse.success(
        res,
        "Login Successful",
        {
          ...returnedUserInfo,
          token: accessToken,
          role: getRoles.list[returnedUserInfo.role],
        },
        200
      );
    }
  } catch (error) {
    console.error("Error logging in", error);
    sendResponse.error(res, error, "Error logging in", 500);
  }
};
module.exports = loginUser;
