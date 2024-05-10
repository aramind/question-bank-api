const getEmployees = require("./getEmployees");
const register = require("./register");

const employeeController = {
  register,
  getEmployees,
};

module.exports = employeeController;
