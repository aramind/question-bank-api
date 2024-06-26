const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const getAllSources = async (req, res) => {
  console.log("IN GET ALL SOURCES CONTROLLER");
  try {
    const questions = await Question.find({}, "sources");
    const allSources = questions.reduce((acc, question) => {
      return acc.concat(question.sources || []);
    }, []);

    const sourcesList = [...new Set(allSources)];

    console.log(sourcesList);
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
  }1
};

module.exports = getAllSources;
