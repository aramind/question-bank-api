const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");

const userController = {
  getUser: async (req, res) => {
    try {
      console.log("getting user");
      sendResponse.success(res);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
