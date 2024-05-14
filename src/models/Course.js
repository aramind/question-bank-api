const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
const constants = require("../config/constants");
dotenv.config();

const CourseSchema = new Schema({
  code: { type: String, required: true, unique: true },
  acronym: { type: String, required: true },
  database: { type: String },
  description: { type: String },
  title: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  remarks: { type: String },
  isHidden: { type: Boolean, required: true, default: false },

  status: {
    type: String,
    enum: constants?.DOC_STATUSES,
    default: constants?.DOC_STATUSES?.[0],
    required: true,
  },
  creator: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  version: {
    type: String,
    required: true,
    default: constants.CURRENT_VERSION,
    enum: { values: constants?.VERSIONS },
  },
});

module.exports = mongoose.model("Course", CourseSchema);
