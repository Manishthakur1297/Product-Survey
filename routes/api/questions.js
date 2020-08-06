const express = require("express");
const router = express.Router();

const User = require("../../models/Question");

const auth = require("../../middleware/auth");

const {
  listQuestions,
  addQuestion,
} = require("../../controllers/questionControllers");

// @route       GET api/questions/
// @desc        GET ALL QUESTIONS
// @access      Private
router.get("/", auth, listQuestions);

// @route       POST api/questions/
// @desc        POST Question
// @access      Private
router.post("/", auth, addQuestion);

module.exports = router;
