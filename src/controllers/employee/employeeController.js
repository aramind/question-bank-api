const deleteEmployee = require("./deleteEmployee");
const getEmployees = require("./getEmployees");
const register = require("./register");
const updateEmployee = require("./updateEmployee");

const employeeController = {
  register,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};

module.exports = employeeController;
