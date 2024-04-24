const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const patchQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const patchData = req.body;

    console.log(questionId);
    console.log(patchData);

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $set: patchData },
      { new: true }
    );

    console.log(updatedQuestion);
    if (!updatedQuestion) {
      sendResponse.failed(res, "Question not found", null, 404);
    }

    sendResponse.success(
      res,
      "Success updating question",
      updatedQuestion,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Internal server error", 500);
  }
};

module.exports = patchQuestion;
