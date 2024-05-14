const sendResponse = require("../../utils/sendResponse");
const Employee = require("../../models/Employee");
const { encrypt } = require("../../utils/securePassword");
const { CURRENT_VERSION } = require("../../config/constants");

const register = async (req, res) => {
  console.log("in register employee controller");

  try {
    const emp = req?.body;
    const creator = req.userInfo?._id;
    console.log(emp);

    const {
      email,
      username,
      password,
      employeeId,
      lastName,
      firstName,
      middleName,
      role,
      status,
    } = emp;

    const existingEmp = await Employee.findOne({
      $or: [{ employeeId }, { username }, { email }],
    });

    if (existingEmp) {
      let errorMessage = "";
      if (existingEmp.employeeId === employeeId) {
        errorMessage = "Employee ID";
      } else if (existingEmp.username === username) {
        errorMessage = "Username";
      } else if (existingEmp.email === email) {
        errorMessage = "Email";
      }
      return sendResponse.failed(
        res,
        `${errorMessage} already in use`,
        null,
        409
      );
    }

    const newEmp = new Employee({
      employeeId,
      username,
      password: encrypt(password),
      email,
      name: { lastName, firstName, middleName },
      role,
      status,
      version: CURRENT_VERSION,
      creator: creator,
    });

    const createdUser = await newEmp.save();
    return sendResponse.success(
      res,
      "User created successfully",
      createdUser,
      201
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return sendResponse.error(res, error, "Error adding user", 500);
  }
};

module.exports = register;
