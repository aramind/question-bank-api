const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const getQuestions = async (req, res) => {
  console.log("Get Questions Controller");

  try {
    const dynamicRouteParams = { ...req.params };
    const dynamicQueryParams = { ...req.query };

    const reqFields = dynamicQueryParams?.fields
      ? dynamicQueryParams?.fields.split(",")
      : [];

    const params = { ...dynamicRouteParams, ...dynamicQueryParams };

    const queryConditions =
      typeof params === "object" && params !== null ? params : {};

    const fields = reqFields?.length > 0 ? reqFields.join(" ") : "";

    const questions = await Question.find(queryConditions, fields)
      .populate({
        path: "topics",
        select: "_id acronym title description",
      })
      .populate({ path: "creator", select: "name -_id" });

    // const questions = await Question.find(params);

    if (!questions) {
      sendResponse.failed(res, "Request returned empty", [], 404);
    }

    return sendResponse.success(
      res,
      "Success retrieving questions",
      questions,
      200
    );
  } catch (error) {
    sendResponse.error(res, error, "Error processing request", 500);
  }
};

module.exports = getQuestions;
