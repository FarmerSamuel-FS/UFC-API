const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Email invalid"],
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew || user.usModified("password")) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("Users", UserSchema);

module.exports = User;
