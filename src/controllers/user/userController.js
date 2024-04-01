const getUser = require("./getUser");
const addUser = require("./addUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");

const userController = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

module.exports = userController;
