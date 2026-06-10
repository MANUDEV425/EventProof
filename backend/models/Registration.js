const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userEmail: String,
  eventId: String,
  score: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);