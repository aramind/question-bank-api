const addCourse = require("./addCourse");
const addSubject = require("./addSubject");
const addTopic = require("./addTopic");
const doSimpleUpdate = require("./doSimpleUpdate");
const getCourseByFields = require("./getCourseByFields");
const getCoursesCount = require("./getCoursesCount");
const getSubjectsByFields = require("./getSubjectsByFields");
const getSubjectsCount = require("./getSubjectsCount");
const getTopicsByFields = require("./getTopicByFields");
const getTopicsCount = require("./getTopicsCount");
const patchCourse = require("./patchCourse");
const patchSubject = require("./patchSubject");
const patchTopic = require("./patchTopic");

const courseController = {
  addCourse,
  getCourseByFields,
  getCoursesCount,
  patchCourse,
  doSimpleUpdate,

  // subjects
  addSubject,
  getSubjectsByFields,
  getSubjectsCount,
  patchSubject,
  // topics
  addTopic,
  getTopicsByFields,
  getTopicsCount,
  patchTopic,
};

module.exports = courseController;
