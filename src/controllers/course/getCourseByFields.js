const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const getCourseByFields = async (req, res) => {
  try {
    console.log("Get course by fields controller");
    const requestedFields = req.query.fields ? req.query.fields.split(",") : [];
    console.log("FIELDS", requestedFields);

    const courses = await Course.find({}, requestedFields.join(" "));

    if (courses) {
      return sendResponse.success(
        res,
        "Success retrieving courses",
        courses,
        200
      );
    } else {
      sendResponse.failed(
        res,
        "Request returned empty list of courses",
        [],
        404
      );
    }
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving courses", 500);
  }
};

module.exports = getCourseByFields;
