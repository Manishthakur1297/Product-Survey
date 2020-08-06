const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const auth = require("../../middleware/auth");

const {
  listUsersAnswers,
  viewProfile,
  updateUser,
} = require("../../controllers/userControllers");

// @route       GET api/users/me
router.get("/me", auth, viewProfile);

// @route       PUT api/users/
router.put("/", auth, updateUser);

// @route       GET api/users/:id/answers
router.get("/:id", auth, listUsersAnswers);

module.exports = router;
