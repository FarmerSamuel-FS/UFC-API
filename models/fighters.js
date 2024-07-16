const mongoose = require("mongoose");

const FightersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  record: {
    wins: {
      type: Number,
      required: true,
    },
    losses: {
      type: Number,
      required: true,
    },
  },
  region: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
});

const Fighter = mongoose.model("Fighters", FightersSchema);

module.exports = Fighter;
