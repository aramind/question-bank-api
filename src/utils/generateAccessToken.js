require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const getRoles = require("./getRoles");

const generateAccessToken = (foundEmployee) => {
  const selectedInfo = _.pick(foundEmployee, [
    "_id",
    "username",
    "employeeId",
    "name",
    "role",
    "status",
  ]);

  const employeeInfo = {
    ...selectedInfo,
    role: getRoles.list[selectedInfo.role],
  };

  const accessToken = jwt.sign(
    { UserInfo: employeeInfo },
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
  );

  return accessToken;
};

module.exports = generateAccessToken;
