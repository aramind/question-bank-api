const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const getSubjectsByFields = async (req, res) => {
  try {
    const requestedFields = req.query.fields ? req.query.fields.split(",") : "";

    const subjects = requestedFields
      ? await Subject.find({}, requestedFields.join(" ")).populate({
          path: "topics",
          select: "_id acronym title description",
        })
      : await Subject.find({}).populate({
          path: "topics",
          select: "_id acronym title description",
        });

    if (!subjects) {
      return sendResponse.failed(res, "No subjects found", null, 404);
    }

    return sendResponse.success(
      res,
      "Subjects successfully retrieved",
      subjects,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, `Error retrieving subjects. ${error}`, 500);
  }
};

module.exports = getSubjectsByFields;
