const addBulkQuestions = require("./addBulkQuestions");
const addQuestion = require("./addQuestion");
const doSimpleQuestionUpdate = require("./doSimpleQuestionUpdate");
const getAllSources = require("./getAllSources");
const getAllTags = require("./getAllTags");
const getQuestions = require("./getQuestions");
const getQuestionsCount = require("./getQuestionsCount");
const patchQuestion = require("./patchQuestion");

const questionController = {
  addQuestion,
  getQuestions,
  patchQuestion,
  getAllTags,
  getAllSources,
  getQuestionsCount,
  doSimpleQuestionUpdate,
  addBulkQuestions,
};

module.exports = questionController;
