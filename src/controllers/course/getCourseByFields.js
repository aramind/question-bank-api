const Course = require("../../models/Course");
const sendResponse = require("../../utils/sendResponse");

const getCourseByFields = async (req, res) => {
  try {
    console.log("Get course by fields controller");
    const requestedFields = req.query.fields ? req.query.fields.split(",") : [];
    // console.log("FIELDS", requestedFields);

    const courses =
      requestedFields?.length > 0
        ? await Course.find({}, requestedFields.join(" "))
            .populate({
              path: "subjects",
              select: "_id acronym title description",
              populate: {
                path: "topics",
                select: "_id acronym title description",
              },
            })
            .populate({
              path: "creator",
              select: "name -_id",
            })
        : await Course.find({})
            .populate({
              path: "subjects",
              select: "_id acronym title description",
              populate: {
                path: "topics",
                select: "_id acronym title description",
              },
            })
            .populate({
              path: "creator",
              select: "name -_id",
            });

    if (!courses) {
      return sendResponse.failed(res, "No courses found", null, 404);
    }

    return sendResponse.success(
      res,
      "Courses successfully retrieved",
      courses,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving courses", 500);
  }
};

module.exports = getCourseByFields;
