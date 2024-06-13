const sendResponse = require("../../utils/sendResponse");

const doSimpleUpdate = (Model) => async (req, res) => {
  try {
    const { _id } = req?.params;
    const data = req?.body;

    const updated = await Model.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedCourse) {
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

module.exports = doSimpleUpdate;
