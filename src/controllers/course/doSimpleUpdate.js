const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const doSimpleUpdate = async (req, res) => {
  try {
    const { _id } = req?.params;
    const data = req?.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedCourse) {
      return sendResponse.failed(res, "Update failed", null, 404);
    }

    return sendResponse.success(
      res,
      "Successfully updated course",
      updatedCourse,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error updating course. Try again.",
      500
    );
  }
};

module.exports = doSimpleUpdate;
