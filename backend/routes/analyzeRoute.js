const express = require('express');
const router = express.Router();

const fetchGithubScore = require('../utils/fetchGithubScore');
const fetchLeetcodeScore = require('../utils/fetchLeetcodeScore');
const fetchCodeforcesScore = require('../utils/fetchCodeforcesScore');
const fetchLinkedinScore = require('../utils/fetchLinkedinScore');
const generateInsights = require('../utils/generateInsights');

router.post('/', async (req, res) => {
  try {
    const {
      githubUsername,
      leetcodeUsername,
      codeforcesUsername,
      linkedinFollowers,
      linkedinEndorsements,
    } = req.body;

    const [githubScore, leetcodeScore, codeforcesScore] = await Promise.all([
      fetchGithubScore(githubUsername),
      fetchLeetcodeScore(leetcodeUsername),
      fetchCodeforcesScore(codeforcesUsername),
    ]);

    // Use user input for LinkedIn data
    const linkedinScore = await fetchLinkedinScore({
      followers: linkedinFollowers,
      endorsements: linkedinEndorsements,
    });

    console.log("✅ GitHub Score:", githubScore.score);
    console.log("✅ LeetCode Score:", leetcodeScore.score);
    console.log("✅ Codeforces Score:", codeforcesScore.score);
    console.log("✅ LinkedIn Score:", linkedinScore.score);

    const scores = {
      githubScore,
      leetcodeScore,
      codeforcesScore,
      linkedinScore: linkedinScore.score,
    };

    const extras = {
      commits: 180,
      prs: 7,
      repos: githubScore.public_repos || 0,
      followers: githubScore.followers || 0,
      endorsements: linkedinScore.endorsements || 0,
      lcSolved: leetcodeScore.totalSolved || 0,
      cfRating: codeforcesScore.rating || 0,
    };

    const profileData = {
      public_repos: githubScore.public_repos,
      followers: githubScore.followers,
      totalSolved: leetcodeScore.totalSolved,
      easySolved: leetcodeScore.easySolved,
      mediumSolved: leetcodeScore.mediumSolved,
      hardSolved: leetcodeScore.hardSolved,
      contestRating: leetcodeScore.contestRating || 0,
      codeforcesRating: codeforcesScore.rating,
      linkedinConnections: linkedinScore.followers,
      linkedinEndorsements: linkedinScore.endorsements,
    };

    const insights = await generateInsights(profileData);

    res.json({
      scores,
      extras,
      insights,
    });

  } catch (err) {
    console.error("❌ Route Error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Something went wrong while analyzing profile.' });
    }
  }
});

module.exports = router;
