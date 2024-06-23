const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const getAllSources = async (req, res) => {
  try {
    const questions = await Question.find({}, "sources");
    const allSources = questions.reduce((acc, question) => {
      return acc.concat(question.sources);
    });

    const sourcesList = [...new Set(allSources)];

    return sendResponse.success(
      res,
      "Sources successfully retrieved",
      sourcesList,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error retrieving sources in database",
      500
    );
  }
};

module.exports = getAllSources;
