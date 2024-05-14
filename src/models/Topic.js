const mongoose = require("mongoose");
const constants = require("../config/constants");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  code: { type: String, required: true, unique: true },
  acronym: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
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

module.exports = mongoose.model("Topic", TopicSchema);
