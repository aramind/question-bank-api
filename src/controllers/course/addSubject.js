const Subject = require("../../models/Subject");
const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");

const addSubject = async (req, res) => {
  try {
    const { code, title } = req.body;

    const data = req.body;

    console.log("DATA", data);
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

    const topicIds = await Promise.all(
      data?.topics?.map(async (topicName) => {
        const topic = await Topic.findOne({ title: topicName });
        return topic ? topic._id : null;
      })
    );

    console.log(topicIds);
    const validTopicIds = topicIds?.filter((id) => id);

    console.log(validTopicIds);
    const newSubject = new Subject({ ...data, topics: validTopicIds });
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
