const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const getTopicsByFields = async (req, res) => {
  try {
    const requestedFields = req.query.fields ? req.query.fields.split(",") : [];

    console.log(requestedFields);

    const records = await Topic.find({}, requestedFields.join(" "));

    if (!records) {
      return sendResponse.failed(res, "No record found", null, 404);
    }

    return sendResponse.success(
      res,
      "Records successfully retrieved",
      records,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, `Error retrieving records. ${error}`, 500);
  }
};

module.exports = getTopicsByFields;
