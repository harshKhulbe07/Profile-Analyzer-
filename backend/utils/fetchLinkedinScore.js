// utils/fetchLinkedinScore.js

async function fetchLinkedinScore({ followers = 0, endorsements = 0 }) {
  return {
    followers,
    endorsements,
    score: Math.min(100,(followers/250)+ (endorsements/4)) // Static or formula-based score
  };
}

module.exports = fetchLinkedinScore;
