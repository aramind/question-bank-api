const { default: mongoose } = require("mongoose");
const Question = require("../../models/Question");
const sendResponse = require("../../utils/sendResponse");

const addBulkQuestions = async (req, res) => {
  console.log("IN ADD BULK QUESTION CONTROLLER");
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const questionsData = req.body;
    const creator = req.userInfo?._id;

    console.log(questionsData);
    if (!Array.isArray(questionsData) || questionsData?.length === 0) {
      await session.abortTransaction();
      session.endSession();
      sendResponse.failed(res, "Invalid input data", null, 400);
      return;
    }

    // check for duplicates
    const codes = questionsData.map((question) => question.code);
    const existingQuestions = await Question.find({
      code: { $in: codes },
    }).session(session);
    const existingCodes = existingQuestions?.map((question) => question.code);

    if (existingCodes?.length > 0) {
      await session.abortTransaction();
      session.endSession();
      sendResponse.failed(
        res,
        "Duplicate question(s) found",
        { duplicates: existingCodes },
        409
      );
      return;
    }

    // add creator to each question
    const questionsWithCreator = questionsData.map((question) => ({
      ...question,
      creator: creator,
    }));

    // Insert questions in the transaction
    const createdQuestions = await Question.insertMany(questionsWithCreator, {
      session,
    });

    // commit transaction
    await session.commitTransaction();
    session.endSession();

    sendResponse.success(
      res,
      "Questions added successfully",
      createdQuestions,
      201
    );
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    sendResponse.failed(res, "Error adding questions", error, 500);
  }
};

module.exports = addBulkQuestions;
