const axios = require('axios');

const fetchGithubScore = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  const repos = response.data;

  let totalCommits = 0;
  let readmeCount = 0;
  for (const repo of repos) {
    if (repo.description) readmeCount++;
    totalCommits += repo.watchers_count;
  }

  const score = (totalCommits / 50) * 10 + readmeCount * 20;
  return Math.min(score, 100);
};

module.exports = { fetchGithubScore };