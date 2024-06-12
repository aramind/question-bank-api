const getCounts = require("./getCounts");
const loginEmployee = require("./loginEmployee");
const logoutUser = require("./logoutUser");
const refreshAccessToken = require("./refreshAccessToken");

const rootController = {
  loginEmployee,
  refreshAccessToken,
  logoutUser,
  getCounts,
};

module.exports = rootController;
