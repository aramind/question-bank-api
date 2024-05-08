const express = require("express");
const courseController = require("../controllers/course/courseController");
const verifyRoles = require("../middlewares/auth/verifyRoles");
const router = express.Router();

console.log("Course Router");
router.use(verifyRoles(["super", "admin", "editor"]));

router.post("", courseController.addCourse);
router.get("/trimmed", courseController.getCourseByFields);

module.exports = router;
