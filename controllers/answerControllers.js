const { validationResult } = require("express-validator");
const Answer = require("../models/Answer");

// @route       GET api/Answers
// @desc        GET ALL Answers
// @access      Private
exports.listAnswers = async (req, res) => {
  try {
    // let query = req.body[0];
    const answers = await Answer.find({});
    return res.json({ answers });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};

// @route       POST api/questions
// @desc        ADD NEW Question
// @access      Private
exports.addAnswers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newAnswer = new Answer({
      user: req.user.id,
      answer: req.body.answer,
    });

    const answer = await newAnswer.save();

    return res.json(answer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};
