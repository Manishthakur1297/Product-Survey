const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = Question = mongoose.model("question", QuestionSchema);
