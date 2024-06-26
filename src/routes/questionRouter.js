const express = require("express");
const questionController = require("../controllers/question/questionController");

const router = express.Router();

console.log("Question Router");
// /v1/questions

router.patch("/simpleUpdate/:_id", questionController.doSimpleQuestionUpdate);
router.patch("/:questionId", questionController.patchQuestion);
router.get("/trimmed", questionController.getQuestions);
router.get("/count", questionController.getQuestionsCount);
router.get("/sources", questionController.getAllSources);
router.get("/tags", questionController.getAllTags);

router.post("", questionController.addQuestion);
router.post("/bulk", questionController.addBulkQuestions);

module.exports = router;
