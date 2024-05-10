const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employee = new Schema({
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
    enum: { values: validRoles },
  },
  status: {
    type: String,
    required: true,
    enum: { values: validStatuses },
  },
  tokens: [{ name: { type: String }, value: { type: String } }],
  sessions: [
    { start: { type: Date, default: Date.now() }, end: { type: Date } },
  ],
  magicWord: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
