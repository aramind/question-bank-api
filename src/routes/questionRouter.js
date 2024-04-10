const express = require("express");
const questionController = require("../controllers/question/questionController");

const router = express.Router();

console.log("Question Router");

router.post("", questionController.addQuestion);

module.exports = router;
