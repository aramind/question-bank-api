const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const getSubjectsCount = async (req, res) => {
  try {
    console.log(req.query);
    const count = await Subject.countDocuments(req.query);
    console.log(count);
    sendResponse.success(res, "", count, 200);
  } catch (error) {
    sendResponse.error(res, error, "Error retrieving count", 500);
  }
};

module.exports = getSubjectsCount;
