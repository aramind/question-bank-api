const handleRefreshToken = require("./handleRefreshToken");
const loginUser = require("./loginUser");
const registerUser = require("./registerUser");
const authControllers = {
  loginUser,
  registerUser,
  handleRefreshToken,
};
module.exports = authControllers;
