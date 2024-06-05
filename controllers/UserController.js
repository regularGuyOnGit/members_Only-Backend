//! User Contoller:

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userInformation");
const Message = require("../models/userText");

// ? Sign-up controllers.

exports.get_signup_form = (req, res, next) => {
  res.render("sign_up_form", {
    title: "Sign-up Form",
  });
};

exports.post_signup_form = [
  body("first_name", "This field is mandatory!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "This field is mandatory!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "This field is mandatory!")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .escape(),
  body("password", "This field is mandatory!")
    .trim()
    .isLength({ min: 5 })
    .withMessage("The password must be at least 5 characters long.")
    .escape(),
  body("reEnterPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
  body("admin").escape(),

  //   (req, res, next) => {
  //     if (req.body.password !== req.body.reEnterPassword) {
  //       res.render("sign_up_form", {
  //         title: "Sign-up Form",
  //         passwordmismatched: "*The password didn't match!",
  //       });
  //     } else {
  //       next();
  //     }
  //   },

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const toBeCreatedUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      membership_status: "",
      isAdmin: req.body.admin || "false",
    });
    if (!error.isEmpty()) {
      console.log(error);
      res.render("sign_up_form", {
        title: "Sign-up Form",
        errors: error.array(),
      });
    } else {
      await toBeCreatedUser.save();
      res.redirect("/");
    }
  }),
];

exports.get_login_form = (req, res, next) => {
  const invalidCredentials = req.session.messages
    ? req.session.messages[req.session.messages.length - 1]
    : null;

  console.log(invalidCredentials);
  res.render("login_form", {
    invalidCredentials,
  });
};
exports.logged_in_page = asyncHandler(async (req, res, next) => {
  const userMessages = await Message.find({})
    .populate("user_created_it")
    .sort({ title: 1 })
    .exec();

  if (userMessages.length < 0) {
    res.render("logged_in_page", {
      msg: "There are no Messages!",
      allMessages: 0,
    });
  }
  res.render("logged_in_page", {
    user: req.user,
    allMessages: userMessages,
  });
});

exports.get_elite_member = (req, res, next) => {
  res.render("elite_member_form", {});
};

exports.post_elite_member = [
  body("answer")
    .trim()
    .isLength({ min: 30 })
    .withMessage("Type atleast 30 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render("elite_member_form", {
        errors: error.array(),
      });
    } else {
      console.log(req.session.passport.user);
      const update = {
        membership_status: "true",
      };
      await User.findByIdAndUpdate(req.session.passport.user, update);
      res.redirect("/logged-in");
    }
  }),
];
