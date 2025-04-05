const axios = require('axios');

const fetchLeetcodeScore= async (username) => {
  try {
    const { data } = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);

    const {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking,
      contributionPoints,
      acceptanceRate,
      reputation,
    } = data;

    // 📊 Scoring formula (max score: 100)
    const score = Math.min(
      100,
      (totalSolved / 500) * 40 + // 0-40 points
      (mediumSolved / 200) * 20 + // 0-20 points
      (hardSolved / 100) * 20 + // 0-20 points
      (acceptanceRate / 100) * 10 + // 0-10 points
      (contributionPoints / 1000) * 10 // 0-10 bonus for active community contribution
    );

    return {
      platform: "LeetCode",
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      contributionPoints,
      reputation,
      score: Math.round(score),
    };
  } catch (err) {
    console.error("Leetcode fetch error:", err.message);
    return { platform: "LeetCode", error: "Failed to fetch data" };
  }
}
module.exports = fetchLeetcodeScore;