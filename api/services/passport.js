const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.js");
const config = require("../config_secret.js");

// Local strategy options
const localOptions = {
  usernameField: "email",
};

// Local strategy
const localStrategy = new LocalStrategy(localOptions, async function (
  email,
  password,
  done,
) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    user.comparePassword(password, function (error, isMatch) {
      if (error) {
        return done(error);
      }
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  } catch (error) {
    return done(error);
  }
});

// JWT strategy options
const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT strategy
const strategy = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});

// Register the strategies
passport.use(localStrategy);
passport.use(strategy);
