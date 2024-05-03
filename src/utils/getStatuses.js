const dotenv = require("dotenv");
dotenv.config();

const STATUSES = JSON.parse(process.env.STATUSES || "{}");

const getStatuses = {
  list: STATUSES,
  keys: Object.keys(STATUSES),
  values: Object.values(STATUSES),
};

module.exports = getStatuses;
