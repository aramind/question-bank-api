const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
const constants = require("../config/constants");
dotenv.config();

const QuestionSchema = new Schema({
  code: { type: String, required: true, unique: true },

  access: { type: Number, default: 1, required: true },
  difficulty: { type: Number, default: 1, required: true },
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
  type: { type: String, required: true },

  question: {
    type: {
      text: { type: String },
      image: { type: String },
      _id: false,
    },
    required: true,
    _id: false,
  },

  choices: [
    {
      value: {
        type: { text: { type: String }, image: { type: String } },
        required: true,
        _id: false,
      },
      isCorrect: { type: Boolean, required: true },
      _id: false,
    },
  ],

  information: {
    type: { text: { type: String }, image: { type: String }, _id: false },
    required: true,
    _id: false,
  },
  isHidden: { type: Boolean, required: true, default: false },
  tags: { type: [String], required: true },
  remarks: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  editors: [
    {
      editor: { type: Schema.Types.ObjectId, ref: "Employee" },
      editDate: { type: Date },
      _id: false,
    },
  ],
  status: {
    type: String,
    enum: constants?.DOC_STATUSES,
    default: constants?.DOC_STATUSES?.[0],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  version: {
    type: String,
    required: true,
    default: constants?.CURRENT_VERSION,
    enum: { values: constants?.VERSIONS },
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
