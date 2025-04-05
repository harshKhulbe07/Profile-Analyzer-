const axios = require('axios');

const fetchCodeforcesScore= async (username)=> {
  try {
    const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const user = data.result[0];

    const { rating = 0, maxRating = 0, contribution = 0, rank = "" } = user;

    // 📊 Scoring formula (max score: 100)
    const score = Math.min(
      100,
      (rating / 3500) * 50 + // rating contributes up to 50 pts
      (maxRating / 3500) * 30 + // peak rating adds up to 30 pts
      (contribution / 100) * 20 // community contribution adds up to 20 pts
    );

    return {
      platform: "Codeforces",
      rating,
      maxRating,
      rank,
      contribution,
      score: Math.round(score),
    };
  } catch (err) {
    console.error("Codeforces fetch error:", err.message);
    return { platform: "Codeforces", error: "Failed to fetch data" };
  }
}
module.exports = fetchCodeforcesScore;