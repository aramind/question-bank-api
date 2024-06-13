const express = require("express");
const courseController = require("../controllers/course/courseController");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const Subject = require("../models/Subject");
const Course = require("../models/Course");
const Topic = require("../models/Topic");
const router = express.Router();

// base API: /v1/courses
console.log("Course Router");
router.use(verifyRoles(["super", "admin", "editor"]));

// subjects
router.get("/subjects/trimmed", courseController.getSubjectsByFields);
router.get("/subjects/count", courseController.getSubjectsCount);
router.post("/subjects", courseController.addSubject);
router.get("/subjects", courseController.getSubjectsByFields);
router.patch(
  "/subjects/simpleUpdate/:_id",
  courseController.doSimpleUpdate(Subject)
);
router.patch("/subjects/:_id", courseController.patchSubject);

// topics

router.get("/topics/trimmed", courseController.getTopicsByFields);
router.get("/topics/count", courseController.getTopicsCount);
router.post("/topics", courseController.addTopic);
router.patch(
  "/topics/simpleUpdate/:_id",
  courseController.doSimpleUpdate(Topic)
);
router.patch("/topics/:_id", courseController.patchTopic);

// general courses

router.get("/trimmed", courseController.getCourseByFields);
router.get("/count", courseController.getCoursesCount);
router.post("", courseController.addCourse);

router.patch("/simpleUpdate/:_id", courseController.doSimpleUpdate(Course));
router.patch("/:_id", courseController.patchCourse);

module.exports = router;
