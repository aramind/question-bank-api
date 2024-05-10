const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VERSIONS = JSON.parse(process.env.VERSIONS);

const TopicSchema = new Schema({
  code: { type: String, required: true, unique: true },
  acronym: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  isHidden: { type: Boolean, required: true, default: false },
  version: { type: String, required: true, enum: { values: VERSIONS } },
});

module.exports = mongoose.model("Topic", TopicSchema);
