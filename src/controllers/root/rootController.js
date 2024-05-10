const loginEmployee = require("./loginEmployee");
const refreshAccessToken = require("./refreshAccessToken");

const rootController = {
  loginEmployee,
  refreshAccessToken,
};

module.exports = rootController;
