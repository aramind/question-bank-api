const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const validRoles = JSON.parse(process.env.VALID_ROLES || "[]");
const validStatuses = JSON.parse(process.env.VALID_STATUSES || "[]");

const authValidator = {
  loginValidator: [
    body("username").trim().notEmpty().withMessage("Username cannot be empty"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],

  registerUserValidator: [
    body("employeeId")
      .trim()
      .notEmpty()
      .withMessage("Employee ID cannot be empty")
      .bail()
      .custom(async (employeeId) => {
        const employeeIdExists = await User.findOne({ employeeId });
        if (employeeIdExists) {
          throw new Error("EmployeeId cannot have duplicate");
        }
        return true;
      }),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username cannot be empty")
      .bail()
      .custom(async (username) => {
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
          throw new Error("Username already taken");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail()
      .custom(async (email) => {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          throw new Error("Email already in use");
        }
      }),

    body("lastName").trim().notEmpty().withMessage("Last Name cannot be empty"),
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First Name cannot be empty"),
    body("middleName").trim(),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role cannot be empty")
      .bail()
      .isIn(validRoles)
      .withMessage("Invalid role"),
    body("status")
      .trim()
      .notEmpty()
      .withMessage("Status cannot be empty")
      .bail()
      .isIn(validStatuses)
      .withMessage("Invalid status"),
  ],
};

module.exports = authValidator;
