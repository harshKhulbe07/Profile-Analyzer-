const express = require('express');
const router = express.Router();
const fetchGithubScore = require('../utils/fetchGithubScore');
const fetchLeetcodeScore = require('../utils/fetchLeetcodeScore');
const fetchCodeforcesScore = require('../utils/fetchCodeforcesScore');
const fetchLinkedinScore = require('../utils/fetchLinkedinScore');
const generateInsights = require('../utils/generateInsights');

router.post('/', async (req, res) => {
  const { githubUsername, leetcodeUsername, codeforcesUsername, linkedinCredentials } = req.body;

  try {
    const githubScore = await fetchGithubScore(githubUsername);
    const codingScore = await fetchLeetcodeScore(leetcodeUsername);
    const codeforcesScore = await fetchCodeforcesScore(codeforcesUsername);
    const linkedinData = await fetchLinkedinScore(linkedinCredentials);

    const linkedinScore = linkedinData?.score || 60;

    const scores = {
      githubScore,
      linkedinScore,
      codingScore,
      codeforcesScore
    };

    const extras = {
      commits: 180,
      prs: 7,
      repos: 5,
      followers: linkedinData?.followers || 250,
      endorsements: linkedinData?.endorsements || 15,
      lcSolved: 210,
      cfRating: codeforcesScore?.rating || 1350
    };

    const insights = await generateInsights(scores, extras);

    res.json({ scores, linkedinData, insights });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
