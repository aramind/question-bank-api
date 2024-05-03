const { validationResult, matchedData } = require("express-validator");
const sendResponse = require("../../utils/sendResponse");
const User = require("../../models/User");
const hashPassword = require("../../utils/hashPassword");
const getAllErrorMessages = require("../../utils/getAllErrorMessages");

const registerUser = async (req, res) => {
  console.log("in register user controller");
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      sendResponse.error(
        res,
        result.array(),
        getAllErrorMessages(result.array()),
        400
      );
      console.log(matchedData(req));
    } else {
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
      } = matchedData(req);

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
      sendResponse.success(res, "User created successfully", createdUser, 201);
    }
  } catch (error) {
    console.error("Error adding user:", error);
    sendResponse.error(res, error, "Error adding user", 500);
  }
};
module.exports = registerUser;
