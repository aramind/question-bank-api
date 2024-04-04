const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const getCoursesList = async (req, res) => {
  try {
    const coursesList = await Course.find({}, "acronym");
    if (coursesList) {
      sendResponse.success(
        res,
        "Courses list retrieved successfully",
        coursesList,
        200
      );
    } else {
      sendResponse.error(res, error, "Empty list of courses", 404);
    }
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving list of courses", 500);
  }
};

module.exports = getCoursesList;
