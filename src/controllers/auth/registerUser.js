// const { validationResult, matchedData } = require("express-validator");
const User = require("../../models/User");
const hashPassword = require("../../utils/hashPassword");
const sendResponse = require("../../utils/sendResponse");

const registerUser = async (req, res) => {
  console.log("in register user controller");
  console.log("REG REQ", req?.body);
  try {
    // const validationError = validationResult(req);
    // if (!validationError.isEmpty()) {
    //   return sendResponse.error(
    //     res,
    //     validationError.array(),
    //     getAllErrorMessages(validationError.array()),
    //     400
    //   );
    // }

    // console.log(matchedData(req));

    const userData = req?.body;

    console.log("USERDATA", userData);
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
    } = userData;

    const existingUser = await User.findOne({
      $or: [{ employeeId }, { username }, { email }],
    });

    if (existingUser) {
      let errorMessage = "";
      if (existingUser.employeeId === employeeId) {
        errorMessage = "Employee ID";
      } else if (existingUser.username === username) {
        errorMessage = "Username";
      } else if (existingUser.email === email) {
        errorMessage = "Email";
      }
      return sendResponse.failed(
        res,
        `${errorMessage} already in use`,
        null,
        409
      );
    }

    const newUser = new User({
      email,
      username,
      employeeId,
      role,
      status,
      name: { lastName, firstName, middleName },
      password: await hashPassword(password),
    });

    const createdUser = await newUser.save();
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

module.exports = registerUser;
