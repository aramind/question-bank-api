const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const deleteUser = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const deletedUser = await User.findOneAndDelete({ employeeId });

    sendResponse.success(res, "Successfully deleted user", deletedUser, 200);
  } catch (error) {
    sendResponse.error(
      res,
      error,
      "Encountered an error deleting user. Try again later",
      500
    );
  }
};

module.exports = deleteUser;
