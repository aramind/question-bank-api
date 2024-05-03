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

      if (await User.findOne({ employeeId })) {
        sendResponse.failed(
          res,
          "Employee ID cannot have duplicate",
          employeeId,
          409
        );
      } else if (await User.findOne({ username })) {
        sendResponse.failed(res, "Username already taken", username, 409);
      } else if (await User.findOne({ email })) {
        sendResponse.failed(res, "Email already in use", email, 409);
      } else {
        console.log(middleName);
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
        sendResponse.success(
          res,
          "User created successfully",
          createdUser,
          201
        );
        console.log(createdUser);
      }
    }
  } catch (error) {
    console.error("Error adding user:", error);
    sendResponse.error(res, error, "Error adding user", 500);
  }
};
module.exports = registerUser;
