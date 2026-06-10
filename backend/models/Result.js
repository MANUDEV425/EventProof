const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userEmail: String,
  eventId: String,
  score: Number,
  total: Number,
});

module.exports = mongoose.model(
  "Result",
  resultSchema
);