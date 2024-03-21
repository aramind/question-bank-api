const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const getUser = async (req, res) => {
  try {
    const dynamicRouteParams = { ...req.params };
    const dynamicQueryParams = { ...req.query };

    const params = { ...dynamicRouteParams, ...dynamicQueryParams };

    const users = await User.find(params);

    if (users.length === 0) {
      sendResponse.failed(res, "No users found", null, 404);
    } else {
      sendResponse.success(res, "Users retrieved successfully", users, 200);
    }
  } catch (error) {
    sendResponse.error(res, error);
  }
};
module.exports = getUser;
