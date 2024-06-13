const sendResponse = require("../../utils/sendResponse");

const doSimpleUpdate = (model) => async (req, res) => {
  console.log("in simpleupdate controller");

  try {
    const { _id } = req?.params;
    const data = req?.body;

    console.log(_id);
    console.log(data);
    const updated = await model.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updated) {
      return sendResponse.failed(res, "Update failed", null, 404);
    }

    return sendResponse.success(res, "Update successful", updated, 200);
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Encountered an error. Try again.",
      500
    );
  }
};

module.exports = doSimpleUpdate;
