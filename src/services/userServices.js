const userServices = {
  addUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const createdUser = newUser.save();
      sendResponse.success(res, "User added successfully", createdUser, 201);
      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
module.exports = userServices;
