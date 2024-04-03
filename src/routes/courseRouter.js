const express = require("express");
const courseController = require("../controllers/course/courseController");
const router = express.Router();

console.log("Course Router");

router.post("", courseController.addCourse);

module.exports = router;
