const getRoles = require("../utils/getRoles");
const getStatuses = require("../utils/getStatuses");
const dotenv = require("dotenv");
dotenv.config();

const constants = {
  VERSIONS: JSON.parse(process.env.VERSIONS),
  CURRENT_VERSION: process.env.CURRENT_VERSION,
  KEY: process.env.MAGIC_WORD,
  ROLES: getRoles.keys,
  STATUSES: getStatuses.keys,
  COURSE_STATUSES: JSON.parse(process.env.COURSE_STATUSES),
  QUESTION_STATUSES: JSON.parse(process.env.QUESTION_STATUSES),
};

module.exports = constants;
