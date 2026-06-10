const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Quiz = require("../models/Quiz");



const generateQuestions = require(
  "../services/aiService"
);
// Create Event
router.post("/", async (req, res) => {
  console.log("POST /events called");
  console.log(req.body);

  try {
    console.log("Creating event...");

    const event = new Event(req.body);

    await event.save();

    console.log("Event saved");

    // Temporary hardcoded quiz questions
   const generatedQuiz =
  await generateQuestions(
    req.body.description
  );

console.log("Gemini Response:");
console.log(generatedQuiz);

let questions;

try {

  questions = JSON.parse(
    generatedQuiz
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );

} catch (error) {

  console.log(
    "Gemini returned invalid JSON"
  );

  console.log(generatedQuiz);

  return res.status(500).json({
    error:
      "Gemini returned invalid JSON",
  });
}

    for (const q of questions) {
      console.log("Saving question:", q.question);

      await Quiz.create({
       eventId: event._id,

  question: q.question,

  options: q.options,

  answer: q.answer,
      });
    }

    console.log("All quizzes saved");

    res.status(201).json({
      message: "Event and quizzes created successfully",
      event,
    });

  } catch (error) {
    console.log("MAIN ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// Get All Events
// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:eventId/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      eventId: req.params.eventId,
    });

    res.status(200).json(quizzes);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;