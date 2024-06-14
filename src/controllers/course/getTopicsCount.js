const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const getTopicsCount = async (req, res) => {
  try {
    const count = await Topic.countDocuments(req.query);

    sendResponse.success(res, "", count, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getTopicsCount;
