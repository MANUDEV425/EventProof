const express = require("express");
const router = express.Router();

const Badge = require("../models/Badge");

router.get("/:email", async (req, res) => {

  try {

    const badges =
      await Badge.find({
        userEmail:
          req.params.email,
      });

    res.json(badges);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;