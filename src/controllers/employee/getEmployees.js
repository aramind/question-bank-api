const Employee = require("../../models/Employee");
const sendResponse = require("../../utils/sendResponse");

const getEmployees = async (req, res) => {
  console.log("in employee get controller");
  try {
    const routeParams = { ...req?.params };
    const queryParams = { ...req?.query };

    const params = { ...routeParams, ...queryParams };

    const employees = await Employee.find(params);

    if (!employees) {
      return sendResponse.failed(res, "No employees found", employees, 404);
    }

    return sendResponse.success(
      res,
      "Success retrieving employees",
      employees,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Error processing request", 500);
  }
};

module.exports = getEmployees;
