// utils/fetchLinkedinScore.js

async function fetchLinkedinScore({ followers = 0, endorsements = 0 }) {
  return {
    followers,
    endorsements,
    score: 75, // Static or formula-based score
  };
}

module.exports = fetchLinkedinScore;
