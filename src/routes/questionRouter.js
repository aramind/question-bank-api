const express = require("express");
const questionController = require("../controllers/question/questionController");

const router = express.Router();

console.log("Question Router");
// /v1/questions

// router.patch("/:questionId", questionController.patchQuestion);
// router.get("", questionController.getQuestions);
router.post("", questionController.addQuestion);

module.exports = router;
