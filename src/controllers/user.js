const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");

const userController = {
  getUser,
  addUser,
};

module.exports = userController;
