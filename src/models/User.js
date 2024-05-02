const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validRoles = JSON.parse(process.env.VALID_ROLES || "[]");
const validStatuses = JSON.parse(process.env.VALID_STATUSES || "[]");

const NameSchema = new Schema({
  lastName: { type: String, required: [true, "Last Name is required"] },
  firstName: { type: String, required: [true, "First Name is required"] },
  middleName: { type: String },
});
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already taken"],
  },
  password: { type: String, required: [true, "Password is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email must be unique"],
  },
  employeeId: {
    type: String,
    required: [true, "Employee ID is required"],
    trim: true,
    unique: [true, "Employee ID must be unique"],
  },
  name: {
    lastName: { type: String, required: [true, "Last Name is required"] },
    firstName: { type: String, required: [true, "First Name is required"] },
    middleName: { type: String },
  },
  role: {
    type: String,
    required: [true, "Role cannot be empty"],
    enum: { values: validRoles, message: "Invalid role" },
  },
  status: {
    type: String,
    required: [true, "Status cannot be empty"],
    enum: { values: validStatuses, message: "Invalid role" },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  this._update.updatedAt = new Date();
});

module.exports = mongoose.model("User", UserSchema);
