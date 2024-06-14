const sendResponse = require("../../utils/sendResponse");
const Question = require("../../models/Question");

const doSimpleQuestionUpdate = () => async (req, res) => {
  console.log("in question simple update controller");

  try {
    const { _id } = req?.params;
    const data = req?.body;

    const updated = await Question.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updated) {
      return sendResponse.failed(res, "Update failed", null, 404);
    }

    return sendResponse.success(res, "Update successful", updated, 200);
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Encountered an error. Try again.",
      500
    );
  }
};

module.exports = doSimpleQuestionUpdate;
