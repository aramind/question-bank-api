const securePassword = require("./securePassword");

const compareEncPassword = (pw, encPw) => {
  try {
    return pw === securePassword.decrypt(encPw);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = compareEncPassword;
