const addQuestion = require("./addQuestion");
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
};

module.exports = questionController;
