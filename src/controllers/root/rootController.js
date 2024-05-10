const loginEmployee = require("./loginEmployee");
const logoutUser = require("./logoutUser");
const refreshAccessToken = require("./refreshAccessToken");

const rootController = {
  loginEmployee,
  refreshAccessToken,
  logoutUser,
};

module.exports = rootController;
