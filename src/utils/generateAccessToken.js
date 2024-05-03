require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const getRoles = require("./getRoles");

const generateAccessToken = (foundUser) => {
  const limitedUserInfo = _.pick(foundUser, [
    "_id",
    "name",
    "email",
    "username",
    "role",
    "status",
    "employeeId",
  ]);

  const userInfo = {
    ...limitedUserInfo,
    role: getRoles.list[limitedUserInfo.role],
  };

  const accessToken = jwt.sign(
    { UserInfo: userInfo },
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
  );

  return accessToken;
};

module.exports = generateAccessToken;
