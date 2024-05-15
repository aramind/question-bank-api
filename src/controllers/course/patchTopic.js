const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const patchTopic = async (req, res) => {
  console.log("in patch topic controller");
  try {
    const { _id } = req?.params;

    const data = req?.body;

    console.log("ID", _id);
    console.log("DATA", data);

    const updatedTopic = await Topic.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    console.log("UT", updatedTopic);

    if (!updatedTopic) {
      return sendResponse.failed(
        res,
        "Updating topic failed. Try again.",
        null,
        404
      );
    }

    return sendResponse.success(
      res,
      "Successfully updated topic info.",
      updatedTopic,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error updating topic in database. Try again.",
      500
    );
  }
};

module.exports = patchTopic;
