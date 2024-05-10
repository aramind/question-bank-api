const Employee = require("../../models/Employee");
const sendResponse = require("../../utils/sendResponse");
const clearCookie = (res, token) => {
  res.clearCookie("jwt", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const onLogoutSuccess = (res) => {
  return sendResponse.success(res, "User logged out successfully", null, 204);
};
const logoutUser = async (req, res) => {
  console.log("in log out controller");

  try {
    const cookies = req?.cookies;

    if (!cookies?.jwt) {
      return onLogoutSuccess(res);
    }

    const refreshToken = cookies.jwt;

    const foundEmployee = await Employee.findOne({
      refreshToken: refreshToken,
    });

    if (!foundEmployee) {
      clearCookie(res, refreshToken);
      return onLogoutSuccess(res);
    }

    foundEmployee.refreshToken = "";
    await foundEmployee.save();

    clearCookie(res, refreshToken);
    return onLogoutSuccess(res);
  } catch (error) {
    return sendResponse.error(
      res,
      error,
      "Error logging out. Try again later.",
      500
    );
  }
};

module.exports = logoutUser;
