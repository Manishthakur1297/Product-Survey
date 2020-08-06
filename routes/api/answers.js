const express = require("express");
const router = express.Router();

const User = require("../../models/Answer");

const auth = require("../../middleware/auth");

const {
  listAnswers,
  addAnswers,
} = require("../../controllers/answerControllers");

// @route       GET api/questions/
// @desc        GET ALL QUESTIONS
// @access      Private
router.get("/", auth, listAnswers);

// @route       POST api/questions/
// @desc        POST Question
// @access      Private
router.post("/", auth, addAnswers);

module.exports = router;
