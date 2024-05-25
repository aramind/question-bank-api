const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const patchQuestion = async (req, res) => {
  console.log("Patch question controller");

  try {
    const { questionId } = req.params;
    const editor = req.userInfo?._id;
    const { editors, _id, ...patchData } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $set: patchData },
      { new: true }
    );

    if (!updatedQuestion) {
      sendResponse.failed(res, "Question not found", null, 404);
    }

    const updatedQuestion2 = await Question.findByIdAndUpdate(questionId, {
      $push: { editors: { editor: editor, editDate: new Date() } },
    });

    if (!updatedQuestion2) {
      sendResponse.failed(res, "Error adding editor", null, 501);
    }

    sendResponse.success(
      res,
      "Question updated successfully",
      updatedQuestion2,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Internal server error", 500);
  }
};

module.exports = patchQuestion;
