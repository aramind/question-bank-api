const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NameSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
});
const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  employeeNumber: { type: String, required: true },
  name: { type: NameSchema },
  role: { type: Number, required: true, enum: [0, 1, 2, 3, 4, 5] }, // 0 - super, 1-admin, 2 - editor, 3-premium user, 4 - public user
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", UserSchema);
