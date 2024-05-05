const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const sendSuccessfulLoggingOut = (res) => {
  sendResponse.success(res, "User logged out successfully", {}, 204);
};

const clearCookie = (res, token) => {
  res.clearCookie("jwt", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const logoutUser = async (req, res) => {
  console.log("in logout controller");
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return sendSuccessfulLoggingOut(res);
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ "tokens.refresh": refreshToken });

    if (!foundUser) {
      clearCookie(res, refreshToken);
      return sendSuccessfulLoggingOut(res);
    }

    foundUser.tokens.refresh = "";
    await foundUser.save();

    clearCookie(res, refreshToken);
    return sendSuccessfulLoggingOut(res);
  } catch (error) {
    sendResponse.error(res, error, "Error Logging out", 500);
  }
};
module.exports = logoutUser;
