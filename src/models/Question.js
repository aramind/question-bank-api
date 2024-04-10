const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
  value: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});
const QuestionSchema = new Schema({
  code: { type: String, required: true },
  database: { type: String, required: true },
  access: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic",
    required: true,
  },
  courses: { type: [String], default: [], required: true },
  subjects: { type: [String], default: [], required: true },
  topics: { type: [String], default: [], required: true },
  type: { type: String, required: true },
  nature: { type: String, required: true },
  difficulty: { type: Number, required: true },
  question: { type: String, required: true },
  choices: { type: [ChoiceSchema] },
  tags: { type: [String], required: true },
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

QuestionSchema.pre("save", async function (next) {
  try {
    const existingQuestion = await mongoose.models.Question.findOne({
      code: this.code,
    });
    if (existingQuestion) {
      throw new Error("Questions has duplicate");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Question", QuestionSchema);
