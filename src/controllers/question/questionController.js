const addQuestion = require("./addQuestion");
const getAllTags = require("./getAllTags");
const getQuestions = require("./getQuestions");
const patchQuestion = require("./patchQuestion");

const questionController = {
  addQuestion,
  getQuestions,
  patchQuestion,
  getAllTags,
};

module.exports = questionController;
