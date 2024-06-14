const Subject = require("../../models/Subject");
const sendResponse = require("../../utils/sendResponse");

const patchSubject = async (req, res) => {
  try {
    const { _id } = req?.params;

    const data = req?.body;

    const updatedSubject = await Subject.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updatedSubject) {
      return sendResponse.failed(
        res,
        "Updating subject failed. Try again",
        null,
        404
      );
    }

    return sendResponse.success(
      res,
      "Successfully updated subject info.",
      updatedSubject,
      200
    );
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error updating subject in database. Try again.",
      500
    );
  }
};

module.exports = patchSubject;
