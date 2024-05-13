const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const addSubject = async (req, res) => {
  try {
    const { code, title } = req.body;

    const subjectData = req.body;

    const existingSubject = await Subject.findOne({
      $or: [{ code }, { title }],
    });

    if (existingSubject) {
      return sendResponse.failed(
        res,
        "Subject cannot have duplicate",
        null,
        409
      );
    }

    const newSubject = new Subject(subjectData);
    const createdSubject = await newSubject.save();

    return sendResponse.success(
      res,
      "Subject added successfully",
      createdSubject,
      201
    );
  } catch (error) {
    console.log(error);
    sendResponse.failed(res, "Error adding subject", error, 500);
  }
};

module.exports = addSubject;
