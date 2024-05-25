const addCourse = require("./addCourse");
const addSubject = require("./addSubject");
const addTopic = require("./addTopic");
const getCourseByFields = require("./getCourseByFields");
const getSubjectsByFields = require("./getSubjectsByFields");
const getTopicsByFields = require("./getTopicByFields");
const patchSubject = require("./patchSubject");
const patchTopic = require("./patchTopic");

const courseController = {
  addCourse,
  getCourseByFields,
  // subjects
  addSubject,
  getSubjectsByFields,
  patchSubject,
  // topics
  addTopic,
  getTopicsByFields,
  patchTopic,
};

module.exports = courseController;
