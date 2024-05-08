const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const patchQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { editor, ...patchData } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        $set: patchData,
        $push: { editors: { editor: editor, editDate: new Date() } },
      },
      { new: true }
    );

    // res.json(updatedQuestion);
    if (!updatedQuestion) {
      sendResponse.failed(res, "Question not found", null, 404);
    }

    sendResponse.success(
      res,
      "Question updated successfully",
      updatedQuestion,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Internal server error", 500);
  }
};

module.exports = patchQuestion;
