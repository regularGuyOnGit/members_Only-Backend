const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/userInformation");

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        return done(null, false, {
          message: "Invalid username or password.",
        });
      }
      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return done(null, false, { message: "Invalid username or password." });
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
