const express = require('express');
const router = express.Router();
const { fetchGithubScore } = require('../utils/fetchGithubScore');
const { fetchLeetcodeScore } = require('../utils/fetchLeetcodeScore');
const { generateInsights } = require('../utils/generateInsights');

router.post('/', async (req, res) => {
  const { githubUsername, leetcodeUsername, linkedinStats } = req.body;

  try {
    const githubScore = await fetchGithubScore(githubUsername);
    const codingScore = await fetchLeetcodeScore(leetcodeUsername);
    const linkedinScore = linkedinStats?.score || 60;

    const scores = {
      githubScore,
      linkedinScore,
      codingScore,
    };

    const extras = {
      commits: 180,
      prs: 7,
      repos: 5,
      followers: linkedinStats?.followers || 250,
      endorsements: linkedinStats?.endorsements || 15,
      lcSolved: 210,
      cfRating: 1350
    };

    const insights = await generateInsights(scores, extras);

    res.json({ scores, insights });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;