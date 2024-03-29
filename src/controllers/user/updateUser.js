const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("ID", userId);
    const {
      username,
      password,
      employeeId,
      lastName,
      firstName,
      middleName,
      role,
      status,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          username,
          password,
          employeeId,
          "name.lastName": lastName,
          "name.firstName": firstName,
          "name.middleName": middleName,
          role,
          status,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updateUser) {
      sendResponse.failed(res, "User does not exist", null, 404);
      return;
    }

    sendResponse.success(
      res,
      "Successfully updated user info",
      updatedUser,
      200
    );
  } catch (error) {
    console.log(error);
    sendResponse.error(res, error);
  }
};
module.exports = updateUser;
