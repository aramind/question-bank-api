const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const addCourse = async (req, res) => {
  try {
    const { code } = req.body;
    const courseData = req.body;
    const existingCourse = await Course.findOne({ code });

    if (existingCourse) {
      sendResponse.failed(res, "Course cannot have duplicate!", null, 409);
      return;
    }

    const newCourse = new Course(courseData);
    const createdCourse = await newCourse.save();
    sendResponse.success(res, "Course added successfully", createdCourse, 201);
    return createdCourse;
  } catch (error) {
    sendResponse.failed(res, "Error adding course", error, 500);
  }
};

module.exports = addCourse;
