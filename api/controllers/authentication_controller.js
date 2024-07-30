const User = require("../models/users");
const jwt = require("jwt-simple");
const config = require("../config_secret");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    config.secret,
  );
};

exports.signin = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("User logged in:", user);
  res.send({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = async (req, res, next) => {
  const { email, password, firstName, lastName, age, country } = req.body;
  if (!email || !password || !firstName || !lastName || !age || !country) {
    return res
      .status(422)
      .json({ error: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already in use" });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      age,
      country,
    });
    await user.save();

    console.log("User signed up:", user);
    res.json({ user_id: user._id, token: tokenForUser(user) });
  } catch (error) {
    console.error("Error during signup:", error);
    return next(error);
  }
};
