const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");
const getAllTags = async (req, res) => {
  console.log("IN get all tags controller");
  try {
    const questions = await Question.find({}, "tags");
    const allTags = questions.reduce((acc, question) => {
      return acc.concat(question.tags);
    }, []);

    const tagsList = [...new Set(allTags)];

    // console.log(tagsList);
    return sendResponse.success(
      res,
      "Tags successfully retrieved",
      tagsList,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error retrieving tags in database.",
      500
    );
  }
};

module.exports = getAllTags;
