const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
dotenv.config();

const COURSE_STATUSES = JSON.parse(process.env.COURSE_STATUSES);
const VERSIONS = JSON.parse(process.env.VERSIONS);

const CourseSchema = new Schema({
  code: { type: String, required: true, unique: true },
  acronym: { type: String, required: true, unique: true },
  database: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  remarks: { type: String },
  isHidden: { type: Boolean, required: true, default: false },

  status: {
    type: String,
    enum: COURSE_STATUSES,
    default: COURSE_STATUSES?.[0],
    required: true,
  },
  creator: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  version: { type: String, required: true, enum: { values: VERSIONS } },
});

module.exports = mongoose.model("Course", CourseSchema);
