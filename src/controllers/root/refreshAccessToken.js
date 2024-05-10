const Employee = require("../../models/Employee");
const sendResponse = require("../../utils/sendResponse");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../../utils/generateAccessToken");
const getRoles = require("../../utils/getRoles");

const refreshAccessToken = async (req, res) => {
  console.log("REFRESH TOKEN CONTROLLER");
  try {
    // console.log(req);
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const foundEmployee = await Employee.findOne({
      refreshToken: refreshToken,
    });

    if (!foundEmployee) {
      return sendResponse.failed(res, "Employee not found", null, 404);
    }

    // *use this in case more user info needs to be returned
    // const returnedEmployeeInfo = _.pick(foundEmployee, [
    //   "_id",
    //   "name",
    //   "username",
    //   "role",
    //   "status",
    //   "employeeId",
    // ]);

    jwt.verify(
      refreshToken,
      process.env.AUTH_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          throw err;
        } else {
          if (foundEmployee.username !== decoded.UserInfo.username) {
            return sendResponse.failed(res, "Unauthorized", null, 400);
          }
          return sendResponse.success(
            res,
            "Token refreshed.",
            {
              //   ...returnedEmployeeInfo,
              token: generateAccessToken(foundEmployee),
              role: getRoles.list[foundEmployee.role],
            },
            200
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    return sendResponse.error(res, error, "Error in requesting new token", 500);
  }
};

module.exports = refreshAccessToken;
