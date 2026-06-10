const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");
const Result = require("../models/Result");
const Badge = require("../models/Badge");
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const {
      userEmail,
      eventId,
      answers,
    } = req.body;

    const quizzes = await Quiz.find({
      eventId,
    });

    const existingResult =
  await Result.findOne({
    userEmail,
    eventId,
  });

if (existingResult) {
  return res.status(400).json({
    message: "Quiz already submitted",
  });
}
    let score = 0;

    quizzes.forEach((quiz) => {
      const userAnswer =
        answers[quiz._id];

      if (
        userAnswer &&
        userAnswer
          .trim()
          .toLowerCase() ===
        quiz.answer
          .trim()
          .toLowerCase()
      ) {
        score++;
      }
    });

    const result =
      new Result({
        userEmail,
        eventId,
        score,
        total: quizzes.length,
      });

    await result.save();

    const review = quizzes.map((quiz) => {
      const userAnswer =
        answers[quiz._id] || "";

      const isCorrect =
        userAnswer
          .trim()
          .toLowerCase() ===
        quiz.answer
          .trim()
          .toLowerCase();

      return {
        questionId: quiz._id,
        isCorrect,
      };
    });

    // Badge Logic
    let badge;

    const percentage =
      (score / quizzes.length) * 100;

    if (percentage === 100) {
      badge = "🏆 Platinum";
    }
    else if (percentage >= 80) {
      badge = "🥇 Gold";
    }
    else if (percentage >= 60) {
      badge = "🥈 Silver";
    }
    else {
      badge = "📚 Participation";
    }

    const event =
      await Event.findById(eventId);

    // Prevent duplicate badges
    const existingBadge =
      await Badge.findOne({
        userEmail,
        eventId,
      });

    if (!existingBadge) {
      await Badge.create({
        userEmail,
        eventId,
        eventTitle: event.title,
        badge,
      });
    }

    res.json({
      score,
      total: quizzes.length,
      badge,
      review,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;