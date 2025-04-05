const express = require("express");
const router = express.Router();
const { generateInsights } = require("../utils/generateInsights");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const insights = await generateInsights(data);
    res.status(200).json({ insights });
  } catch (error) {
    console.error("Insight generation failed:", error.message);
    res.status(500).json({ error: "Insight generation failed" });
  }
});

module.exports = router;
