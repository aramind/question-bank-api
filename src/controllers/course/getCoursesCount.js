const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const getCoursesCount = async (req, res) => {
  try {
    console.log(req.query);
    const count = await Course.countDocuments(req.query);
    console.log(count);
    sendResponse.success(res, "", count, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getCoursesCount;
