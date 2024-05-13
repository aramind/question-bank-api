const express = require("express");
const courseController = require("../controllers/course/courseController");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const router = express.Router();

// base API: /v1/courses
console.log("Course Router");
router.use(verifyRoles(["super", "admin", "editor"]));

router.post("", courseController.addCourse);
router.get("/trimmed", courseController.getCourseByFields);

// subjects
router.post("/subjects", courseController.addSubject);
router.get("/subjects/trimmed", courseController.getSubjectsByFields);
router.get("/subjects", courseController.getSubjectsByFields);
// topics
router.post("/topics", courseController.addTopic);
router.get("/topics/trimmed", courseController.getTopicsByFields);

module.exports = router;
