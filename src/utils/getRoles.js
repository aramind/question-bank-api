const dotenv = require("dotenv");
dotenv.config();

const ROLES = JSON.parse(process.env.ROLES || "{}");

const getRoles = {
  list: ROLES,
  keys: Object.keys(ROLES),
  values: Object.values(ROLES),
};

module.exports = getRoles;
