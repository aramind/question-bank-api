const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const getCoursesCount = async (req, res) => {
  try {
    const count = await Course.countDocuments(req.query);

    sendResponse.success(res, "", count, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getCoursesCount;
