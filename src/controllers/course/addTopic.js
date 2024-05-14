const Topic = require("../../models/Topic");
const sendResponse = require("../../utils/sendResponse");
const addTopic = async (req, res) => {
  try {
    const { code, title } = req.body;
    const data = req.body;
    const creator = req.userInfo?._id;

    const existing = await Topic.findOne({
      $or: [{ code }, { title }],
    });

    if (existing) {
      return sendResponse.failed(res, "Duplicate encountered.", null, 409);
    }

    const newTopic = new Topic({ ...data, creator: creator });
    const createdTopic = await newTopic.save();

    return sendResponse.success(
      res,
      "New Record added successfully",
      createdTopic,
      201
    );
  } catch (error) {
    console.log(error);
    sendResponse.failed(
      res,
      "Error performing requested operation",
      error,
      500
    );
  }
};

module.exports = addTopic;
