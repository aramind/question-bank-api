const addQuestion = require("./addQuestion");
const doSimpleQuestionUpdate = require("./doSimpleQuestionUpdate");
const getAllTags = require("./getAllTags");
const getQuestions = require("./getQuestions");
const getQuestionsCount = require("./getQuestionsCount");
const patchQuestion = require("./patchQuestion");

const questionController = {
  addQuestion,
  getQuestions,
  patchQuestion,
  getAllTags,
  getQuestionsCount,
  doSimpleQuestionUpdate,
};

module.exports = questionController;
