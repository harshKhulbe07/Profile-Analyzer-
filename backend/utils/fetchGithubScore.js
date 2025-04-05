const axios = require('axios');
require('dotenv').config();

const fetchGithubScore = async (username) => {
  try {
    let page = 1;
    let score = 0;
    let remainingRequests = 0;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      // Check for rate limit status
      remainingRequests = response.headers['x-ratelimit-remaining'];
      if (remainingRequests <= 0) {
        console.error("❌ Rate limit exceeded! Please try again later.");
        break;
      }

      const repos = response.data;
      if (repos.length === 0) break; // No more repositories to fetch

      for (const repo of repos) {
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const hasDocs = repo.description ? 1 : 0;

        score += stars * 1 + forks * 2 + hasDocs * 5;
      }

      // If there are fewer than 100 repos, we have reached the last page
      if (repos.length < 100) break;

      page++; // Increment page number for the next API call
    }

    // Normalize score to 0–100
    const normalizedScore = Math.min(Math.round(score / 10), 100);
    return normalizedScore;

  } catch (error) {
    console.error("❌ GitHub API error:", error.message);
    console.log("🔑 GitHub token loaded:", !!process.env.GITHUB_TOKEN);

    throw new Error('Failed to fetch GitHub score');
  }
};

module.exports = fetchGithubScore ;
