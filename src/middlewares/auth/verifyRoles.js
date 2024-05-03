const getKeyByValue = require("../../utils/getKeyByValue");
const getRoles = require("../../utils/getRoles");
const sendResponse = require("../../utils/sendResponse");

const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    role = req?.userInfo?.role;
    if (!role) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const roleName = getKeyByValue(getRoles.list, role);

    if (!allowedRoles.includes(roleName)) {
      return sendResponse.failed(res, "Unauthorized", null, 403);
    }

    console.log("passed verify role");
    next();
  };
};
module.exports = verifyRoles;
