require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
// const getRoles = require("./getRoles");

const generateRefreshToken = (foundUser) => {
  const limitedUserInfo = _.pick(foundUser, [
    "_id",
    "email",
    "username",
    "employeeId",
  ]);

  // const userInfo = {
  //   ...limitedUserInfo,
  //   role: getRoles.list[limitedUserInfo.role],
  // };

  const refreshToken = jwt.sign(
    { UserInfo: limitedUserInfo },
    process.env.AUTH_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
  );

  return refreshToken;
};

module.exports = generateRefreshToken;
