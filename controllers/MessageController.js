const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userInformation");
const Message = require("../models/userText");

exports.get_message_form = (req, res, next) => {
  res.render("message_form", {});
};

exports.post_message_form = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Type in atleast 1 character")
    .escape(),
  body("msg_text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Type in atleast 1 character")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    console.log(req.session);
    const newMsg = new Message({
      user_created_it: req.session.passport.user,
      title: req.body.title,
      time_stamp: new Date(),
      msg_text: req.body.msg_text,
    });
    if (!error.isEmpty()) {
      res.render("message_form", {
        errors: error.array(),
      });
    } else {
      await newMsg.save();
      res.redirect("/logged-in");
    }
  }),
];

exports.get_msg_list = asyncHandler(async (req, res, next) => {
  const msgID = req.body.msg_text_delete;
  await Message.findByIdAndDelete(msgID);
  res.redirect("/logged-in");
});
