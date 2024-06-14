const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const compareEncPassword = require("../../utils/compareEncPassword");
const sendResponse = require("../../utils/sendResponse");
const generateAccessToken = require("../../utils/generateAccessToken");
const generateRefreshToken = require("../../utils/generateRefreshToken");
const getRoles = require("../../utils/getRoles");
require("dotenv").config();

const loginEmployee = async (req, res) => {
  try {
    // const result = validationResult(req);

    // console.log(result.array());
    // if (!result.isEmpty()) {
    //   return sendResponse.error(
    //     res,
    //     result.array(),
    //     getAllErrorMessages(result.array()),
    //     400
    //   );
    // }

    // console.log(matchedData(req));
    // const { username, password } = matchedData(req);
    const { username, password } = req.body;

    const foundEmp = await Employee.findOne({ username });
    if (!foundEmp) {
      return sendResponse.failed(res, "Invalid credentials", null, 401);
    }

    const match = await compareEncPassword(password, foundEmp.password);
    // const match = await comparePassword(password, foundUser.password);
    if (!match) {
      return sendResponse.failed(res, "Invalid credentials", null, 401);
    } else {
      // create and attach jwt tokens
      const accessToken = generateAccessToken(foundEmp);
      const refreshToken = generateRefreshToken(foundEmp);

      foundEmp.refreshToken = refreshToken;

      const updateEmp = await foundEmp.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // *use this in case more user info needs to be returned
      // const returnedEmpInfo = _.pick(foundEmp, [
      //   "_id",
      //   "name",
      //   "username",
      //   "role",
      //   "status",
      //   "employeeId",
      // ]);

      sendResponse.success(
        res,
        "Login Successful",
        {
          // ...returnedEmpInfo,
          token: accessToken,
          role: getRoles.list[foundEmp.role],
        },
        200
      );
    }
  } catch (error) {
    console.error("Error logging in", error);
    sendResponse.error(res, error, "Error logging in", 500);
  }
};
module.exports = loginEmployee;
