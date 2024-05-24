const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const addUser = async (req, res) => {
  try {
    // console.log(req.body);

    const {
      email,
      username,
      password,
      employeeId,
      lastName,
      firstName,
      middleName,
      role,
      status,
    } = req.body;

    const existingUser = await User.findOne({ employeeId });

    if (existingUser) {
      sendResponse.failed(res, "User already existed!");
      console.log("User already existed!");
      return;
    }

    const newUser = new User({
      username,
      password,
      email,
      employeeId,
      name: {
        lastName,
        firstName,
        middleName,
      },
      role,
      status,
    });
    const createdUser = await newUser.save();
    sendResponse.success(res, "User added successfully", createdUser, 201);
    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = addUser;
