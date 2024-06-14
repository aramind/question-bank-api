const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const getQuestionsCount = async (req, res) => {
  console.log("Get Question Controller");
  try {
    const count = await Question.countDocuments(req.query);

    sendResponse.success(res, "", count, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getQuestionsCount;
