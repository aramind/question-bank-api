const mongoose = require("mongoose");
const { VERSIONS, STATUSES, ROLES } = require("../config/constants");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  employeeId: { type: String, required: true, trim: true, unique: true },
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
  name: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
  },
  role: {
    type: String,
    required: true,
    enum: { values: ROLES },
  },
  status: {
    type: String,
    required: true,
    enum: { values: STATUSES },
  },
  tokens: [{ name: { type: String }, value: { type: String } }],
  sessions: [
    { start: { type: Date, default: Date.now() }, end: { type: Date } },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  version: { type: String, required: true, enum: { values: VERSIONS } },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
