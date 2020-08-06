const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// @route       GET api/users/me
// @desc        User Profile
// @access      Private
exports.viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error!!!");
  }
};

// @route       GET api/users/:id/answers
// @desc        GET ALL POSTS
// @access      Private
exports.listUsersAnswers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found!!!" });
    }

    const answers = await Answer.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", mongoose.Types.ObjectId(req.params.id)],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.json({ answers });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Channel Not Found!!!" });
    }
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};

// @route       PUT api/users
// @desc        Update User
// @access      Private

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User Not Found!!!" });
    }

    const { survey } = req.body;

    const userFields = {};

    userFields.survey = survey;

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { new: true }
    );

    return res.json(updateUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};
