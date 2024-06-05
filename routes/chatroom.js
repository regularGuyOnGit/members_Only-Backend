//! This is the main route of the app

const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController");
const msg = require("../controllers/MessageController");
const passport = require("../config/authentication");

// Signup Page setup
router.get("/sign-up", user.get_signup_form);
router.post("/sign-up", user.post_signup_form);

// Login form
router.get("/login", user.get_login_form);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/logged-in",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

// Log-out route

router.get("/logout", (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      return next(error);
    } else {
      res.redirect("/login");
    }
  });
});

// Logged In Page
router.get(
  "/logged-in",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  user.logged_in_page
);

// Elite memeber get req
router.get("/elite_member", user.get_elite_member);
router.post("/elite_member", user.post_elite_member);

// Message form
router.get("/message_form", msg.get_message_form);
router.post("/message_form", msg.post_message_form);

// Delete request;

// router.get(delete)
router.post("/delete_msg", msg.get_msg_list);

module.exports = router;
