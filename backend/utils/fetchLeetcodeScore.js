const axios = require('axios');

const fetchLeetcodeScore = async (username) => {
  try {
    if (!username) {
      return { platform: "LeetCode", error: "Username required", score: 0 };
    }

    // 🔹 Minimal GraphQL query (less likely to get blocked)
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const response = await axios.post(
      'https://leetcode.com/graphql/',
      {
        query,
        variables: { username },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
          'Origin': 'https://leetcode.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    const stats =
      response.data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];

    if (!stats.length) {
      return { platform: "LeetCode", error: "User not found", score: 0 };
    }

    // Helper function
    const getCount = (difficulty) =>
      stats.find((s) => s.difficulty === difficulty)?.count || 0;

    const totalSolved = getCount("All");
    const easySolved = getCount("Easy");
    const mediumSolved = getCount("Medium");
    const hardSolved = getCount("Hard");

    // Simple scoring (you can tweak later)
    const score = Math.min(
      100,
      (totalSolved / 500) * 50 +
      (mediumSolved / 200) * 25 +
      (hardSolved / 100) * 25
    );

    return {
      platform: "LeetCode",
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      score: Math.round(score),
    };

  } catch (err) {
    console.error(
      "Leetcode fetch error:",
      err.response?.data || err.message
    );

    return {
      platform: "LeetCode",
      error: "Failed to fetch data",
      score: 0,
    };
  }
};

module.exports = fetchLeetcodeScore;