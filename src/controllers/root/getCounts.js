const Course = require("../../models/Course");
const Question = require("../../models/Question");
const Subject = require("../../models/Subject");
const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

// Helper function to extract counts for specific statuses
const extractCounts = (counts) => {
  const countMap = {};
  counts.forEach((item) => {
    countMap[item._id] = item.count || 0;
  });
  return countMap;
};

const getCounts = async (req, res) => {
  console.log("IN GET COUNTS CONTROLLER");
  try {
    const questionsCount = await Question.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const topicsCount = await Topic.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const subjectsCount = await Subject.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const coursesCount = await Course.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {
      questions: extractCounts(questionsCount),
      topics: extractCounts(topicsCount),
      subjects: extractCounts(subjectsCount),
      courses: extractCounts(coursesCount),
    };
    sendResponse.success(res, "", counts, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getCounts;
