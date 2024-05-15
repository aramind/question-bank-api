const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const getTopicsByFields = async (req, res) => {
  try {
    const requestedFields = req.query.fields ? req.query.fields.split(",") : [];

    console.log(requestedFields);

    const records = requestedFields
      ? await Topic.find({}, requestedFields.join(" ")).populate({
          path: "creator",
          select: "name -_id",
        })
      : await Topic.find({}).populate({
          path: "creator",
          select: "name -_id",
        });

    if (!records) {
      return sendResponse.failed(res, "No topics found", null, 404);
    }

    return sendResponse.success(
      res,
      "Topics successfully retrieved",
      records,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, `Error retrieving records. ${error}`, 500);
  }
};

module.exports = getTopicsByFields;
