const sendResponse = require("../../../utils/sendResponse");
const User = require("../../User");

const findByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      sendResponse.failed(res, "Wrong credentials", null, 400);
    }
    const passwordMatch = await isPasswordCorrect();
    if (!passwordMatch) {
      sendResponse.failed(res, "Wrong credentials", null, 400);
    }
  } catch (error) {}
};
module.exports = findByCredentials;
