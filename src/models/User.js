const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NameSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
});
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  employeeId: { type: String, required: true },
  name: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
  },
  role: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const existingUser = await mongoose.models.User.findOne({
      employeeId: this.employeeId,
    });
    if (existingUser) {
      throw new Error("Employee already included");
    }
  } catch (error) {
    next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  this._update.updatedAt = new Date();
});

module.exports = mongoose.model("User", UserSchema);
