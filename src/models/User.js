const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
const getRoles = require("../utils/getRoles");
const getStatuses = require("../utils/getStatuses");
dotenv.config();

const validRoles = getRoles.keys;
const validStatuses = getStatuses.keys;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  employeeId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
  },
  role: {
    type: String,
    required: true,
    enum: { values: validRoles },
  },
  status: {
    type: String,
    required: true,
    enum: { values: validStatuses },
  },
  tokens: {
    refresh: { type: String },
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
