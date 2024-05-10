const getEmployees = require("./getEmployees");
const register = require("./register");
const updateEmployee = require("./updateEmployee");

const employeeController = {
  register,
  getEmployees,
  updateEmployee,
};

module.exports = employeeController;
