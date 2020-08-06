const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    answer: {
      type: [
        {
          question: { type: mongoose.Schema.Types.ObjectId, ref: "question" },
          ans: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// AnswerSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "username",
//   }).populate({
//     path: "question",
//     select: "question",
//   });
//   next();
// });

module.exports = Answer = mongoose.model("answer", AnswerSchema);
