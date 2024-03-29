const getUser = require("./getUser");
const addUser = require("./addUser");
const updateUser = require("./updateUser");

const userController = {
  getUser,
  addUser,
  updateUser,
};

module.exports = userController;
