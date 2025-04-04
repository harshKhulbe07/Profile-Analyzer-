const axios = require('axios');

const fetchLeetcodeScore = async (username) => {
  const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
  const { totalSolved, easySolved, mediumSolved, hardSolved } = res.data;

  const score = easySolved * 2 + mediumSolved * 5 + hardSolved * 10;
  return Math.min(score, 100);
};

module.exports = { fetchLeetcodeScore };
