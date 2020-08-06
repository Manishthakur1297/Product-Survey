const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// @route       POST api/questions
// @desc        ADD NEW Question
// @access      Private
exports.addQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newQuestion = new Question({
      question: req.body.question,
      state: req.body.state,
    });

    const question = await newQuestion.save();

    return res.json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};

// @route       GET api/questions
// @desc        GET ALL Questions
// @access      Private
exports.listQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ state: req.query.state });
    // console.log(questions);
    return res.json(questions);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};
