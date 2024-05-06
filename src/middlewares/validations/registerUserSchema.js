const Joi = require("joi");
const generateErrorMessages = require("./generateErrorMessages");

const validRoles = JSON.parse(process.env.VALID_ROLES || "[]");
const validStatuses = JSON.parse(process.env.VALID_STATUSES || "[]");

const registerUserSchema = {
  body: Joi.object({
    employeeId: Joi.string()
      .trim()
      .required()
      .messages(generateErrorMessages("Employee ID")),
    username: Joi.string()
      .trim()
      .required()
      .messages(generateErrorMessages("Username")),
    password: Joi.string()
      .trim()
      .required()
      .min(4)
      .max(20)
      .messages(generateErrorMessages("Password")),
    email: Joi.string()
      .trim()
      .required()
      .email()
      .messages(generateErrorMessages("Email")),
    lastName: Joi.string()
      .trim()
      .required()
      .messages(generateErrorMessages("Last Name")),
    firstName: Joi.string()
      .trim()
      .required()
      .messages(generateErrorMessages("First Name")),
    middleName: Joi.string()
      .trim()
      .messages(generateErrorMessages("Middle Name")),
    role: Joi.string()
      .trim()
      .required()
      .valid(...validRoles)
      .messages(generateErrorMessages("Role")),
    status: Joi.string()
      .trim()
      .required()
      .valid(...validStatuses)
      .messages(generateErrorMessages("Status")),
  }),
};
module.exports = registerUserSchema;
