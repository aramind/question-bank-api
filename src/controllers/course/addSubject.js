const { default: mongoose } = require("mongoose");
const Subject = require("../../models/Subject");
const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const addSubject = async (req, res) => {
  console.log("ADD SUBJ CONTROLLER");
  try {
    const { code, title, topics, ...data } = req.body;

    const creator = req.userInfo?._id;

    const existingSubject = await Subject.findOne({
      $or: [{ code }, { title }],
    });

    if (existingSubject) {
      return sendResponse.failed(
        res,
        "Subject cannot have duplicate",
        null,
        409
      );
    }

    let validTopicIds = [];

    if (mongoose.Types.ObjectId.isValid(topics[0])) {
      // filter all valid topic ids in the topics provided
      validTopicIds = topics.filter((topicId) =>
        mongoose.Types.ObjectId.isValid(topicId)
      );

      // ensuring all provided topicIds are in db
      const topicDocs = await Topic.find({ _id: { $in: validTopicIds } });
      validTopicIds = topicDocs.map((topic) => topic._id);
    } else {
      const topicIds = await Promise.all(
        data?.topics?.map(async (topicName) => {
          const topic = await Topic.findOne({ title: topicName });
          return topic ? topic._id : null;
        })
      );
      validTopicIds = topicIds?.filter((id) => id);
    }

    const newSubject = new Subject({
      ...data,
      code,
      title,
      topics: validTopicIds,
      creator: creator,
    });
    const createdSubject = await newSubject.save();

    return sendResponse.success(
      res,
      "Subject added successfully",
      createdSubject,
      201
    );
  } catch (error) {
    console.log(error);
    sendResponse.failed(res, "Error adding subject", error, 500);
  }
};

module.exports = addSubject;
