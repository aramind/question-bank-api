const Employee = require("../../models/Employee");
const { encrypt } = require("../../utils/securePassword");
const sendResponse = require("../../utils/sendResponse");
const updateEmployee = async (req, res) => {
  try {
    const { id } = req?.params;

    const {
      employeeId,
      lastName,
      firstName,
      middleName,
      email,
      role,
      status,
      password,
    } = req?.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          employeeId,
          "name.lastName": lastName,
          "name.firstName": firstName,
          "name.middleName": middleName,
          email,
          role,
          status,
          password: encrypt(password),
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return sendResponse.failed(res, "Employee does not exist", null, 404);
    }

    sendResponse.success(
      res,
      "Successfully updated employee info",
      updatedEmployee,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      `Server error. Updating employee details failed}`,
      500
    );
  }
};

module.exports = updateEmployee;
