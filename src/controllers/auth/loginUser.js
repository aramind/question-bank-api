const { validationResult, matchedData } = require("express-validator");
const sendResponse = require("../../utils/sendResponse");
const getAllErrorMessages = require("../../utils/getAllErrorMessages");
const comparePassword = require("../../utils/comparePassword");
const User = require("../../models/User");
const _ = require("lodash");

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
      sendResponse.success(res, "Login Successful", limitedUserInfo, 200);
    }
  } catch (error) {
    console.error("Error logging in", error);
    sendResponse.error(res, error, "Error logging in", 500);
  }
};
module.exports = loginUser;
