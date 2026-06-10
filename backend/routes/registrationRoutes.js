const express = require("express");
const router = express.Router();

const Registration = require(
  "../models/Registration"
);

router.post("/", async (req, res) => {
  try {

    const existingRegistration =
      await Registration.findOne({
        userEmail: req.body.userEmail,
        eventId: req.body.eventId,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already Registered",
      });
    }

    const registration =
      new Registration(req.body);

    await registration.save();

    res.status(201).json({
      message:
        "Registered Successfully",
      registration,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;