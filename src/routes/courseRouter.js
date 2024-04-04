const express = require("express");
const courseController = require("../controllers/course/courseController");
const router = express.Router();

console.log("Course Router");

router.post("", courseController.addCourse);
router.get("/trimmed", courseController.getCourseByFields);

module.exports = router;
