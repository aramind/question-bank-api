const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  shortTitle: { type: String, required: true },
  longTitle: { type: String, required: true },
  topics: [{ type: String, required: true }],
});
const CourseSchema = new Schema({
  acronym: { type: String, required: true },
  code: { type: String, required: true },
  database: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  subjects: { type: [SubjectSchema] },
  remarks: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "deleted"],
    default: "pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

CourseSchema.pre("save", async function (next) {
  try {
    const existingCourse = await mongoose.models.Course.findOne({
      code: this.code,
    });
    if (existingCourse) {
      throw new Error("Course cannot have duplicate");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Course", CourseSchema);
