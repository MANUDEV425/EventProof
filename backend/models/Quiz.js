const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },

  question: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Quiz",
  QuizSchema
);