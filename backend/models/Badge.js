const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  userEmail: String,
  eventId: String,
  eventTitle: String,
  badge: String,
});

module.exports = mongoose.model(
  "Badge",
  badgeSchema
);