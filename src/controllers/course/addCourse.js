const Course = require("../../models/Course");
const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const addCourse = async (req, res) => {
  // console.log("add course controller");
  try {
    const { code, title } = req.body;

    const data = req.body;
    const creator = req.userInfo?._id;
    // console.log(req.userInfo);
    // console.log(data);
    const existingCourse = await Course.findOne({
      $or: [{ code }, { title }],
    });

    if (existingCourse) {
      sendResponse.failed(res, "Course cannot have duplicate!", null, 409);
      return;
    }

    const subjectIds = await Promise.all(
      data?.subjects?.map(async (title) => {
        const subject = await Subject.findOne({ title: title });
        return subject ? subject._id : null;
      })
    );

    const validSubjectIds = subjectIds?.filter((id) => id);

    const newCourse = new Course({
      ...data,
      subjects: validSubjectIds,
      creator: creator,
    });

    const createdCourse = await newCourse.save();

    return sendResponse.success(
      res,
      "Course added successfully",
      createdCourse,
      201
    );
  } catch (error) {
    console.log(error);
    sendResponse.failed(res, "Error adding course", error, 500);
  }
};

module.exports = addCourse;
