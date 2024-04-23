const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const getQuestions = async (req, res) => {
  try {
    console.log("Get Questions Controller");
    const questions = await Question.find(req.query);

    if (questions) {
      sendResponse.success(res, "Success retrieving questions", questions, 200);
    } else {
      sendResponse.failed(res, "Request returned empty", [], 404);
    }
  } catch (error) {
    sendResponse.error(res, error, "Error processing request", 500);
  }
};

module.exports = getQuestions;
