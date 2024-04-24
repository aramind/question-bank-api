const addQuestion = require("./addQuestion");
const getQuestions = require("./getQuestions");
const patchQuestion = require("./patchQuestion");

const questionController = {
  addQuestion,
  getQuestions,
  patchQuestion,
};

module.exports = questionController;
