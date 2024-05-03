const bcrypt = require("bcryptjs");

const comparePassword = async (raw, hash) => {
  try {
    return await bcrypt.compare(raw, hash);
  } catch (error) {
    console.error("Error generating hashed password:", error);
  }
};
module.exports = comparePassword;
