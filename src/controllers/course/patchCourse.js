const Course = require("../../models/Course");
const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const patchCourse = async (req, res) => {
  console.log("in patch course controller");

  try {
    const { _id } = req?.params;
    const data = req?.body;

    const subjectIds = await Promise.all(
      data?.subjects?.map(async (title) => {
        const subject = await Subject.findOne({ title: title });
        return subject ? subject._id : null;
      })
    );

    const validSubjectIds = subjectIds?.filter((id) => id);

    const updatedCourse = await Course.findOneAndUpdate(
      { _id },
      { $set: { ...data, subjects: validSubjectIds } },
      { new: true }
    );

    if (!updatedCourse) {
      return sendResponse.failed(res, "Course not found", null, 404);
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

module.exports = patchCourse;
