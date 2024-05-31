const Employee = require("../../models/Employee");
const sendResponse = require("../../utils/sendResponse");

const deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedEmp = await Employee.findOneAndDelete({ _id });

    sendResponse.success(
      res,
      "Successfully deleted employee.",
      deletedEmp,
      200
    );
  } catch (error) {
    sendResponse.error(
      res,
      error,
      "Encountered an error deleting user. Try again later.",
      500
    );
  }
};

module.exports = deleteEmployee;
