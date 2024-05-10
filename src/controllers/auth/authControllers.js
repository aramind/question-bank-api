const handleRefreshToken = require("./handleRefreshToken");
const registerUser = require("./registerUser");
const authControllers = {
  registerUser,
  handleRefreshToken,
};
module.exports = authControllers;
