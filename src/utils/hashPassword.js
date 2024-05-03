const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error generating hashed password:", error);
  }
};

module.exports = hashPassword;
