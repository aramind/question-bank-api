const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");

const userController = {
  getUser: async (req, res) => {
    try {
      const dynamicRouteParams = { ...req.params };
      const dynamicQueryParams = { ...req.query };

      const params = { ...dynamicRouteParams, ...dynamicQueryParams };

      const users = await User.find(params);

      if (users.length === 0) {
        sendResponse.failed(res, "No users found", null, 404);
      } else {
        sendResponse.success(res, "Users retrieved successfully", users, 200);
      }
    } catch (error) {
      sendResponse.error(res, error);
    }
  },
  addUser: async (req, res) => {
    try {
      console.log(req.body);
      const newUser = new User(req.body);
      const createdUser = newUser.save();
      sendResponse.success(res, "User added successfully", createdUser, 201);
      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = userController;
