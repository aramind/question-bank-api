const generateErrorMessages = (fieldName) => ({
  "any.required": `${fieldName} is required`,
  "string.empty": `${fieldName} cannot be empty`,
  "number.base": `${fieldName} must be a number`,
  "string.email": `Email is invalid`,
  "string.min": `${fieldName} is very short`,
  "string.max": `${fieldName} is very long`,
  "any.only": `${fieldName} is invalid`,
});

module.exports = generateErrorMessages;
