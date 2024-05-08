const sendResponse = require("../../utils/sendResponse");
const Question = require("../../models/Question");
const addQuestion = async (req, res) => {
  console.log("in add question controller");
  try {
    const { code } = req.body;
    const questionData = req.body;

    // console.log(questionData);
    const existingQuestion = await Question.findOne({ code });

    if (existingQuestion) {
      sendResponse.failed(res, "Question cannot have duplicate", null, 409);
      return;
    }

    const newQuestion = new Question(questionData);
    const createdQuestion = await newQuestion.save();
    sendResponse.success(
      res,
      "Question added successfully",
      createdQuestion,
      201
    );
  } catch (error) {
    console.log(error);
    sendResponse.failed(res, "Error adding question", error, 500);
  }
};

module.exports = addQuestion;
