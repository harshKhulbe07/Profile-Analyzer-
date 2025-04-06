const axios = require('axios');
require('dotenv').config();

const fetchGithubScore = async (username) => {
  try {
    let page = 1;
    let score = 0;
    let allRepos = [];

    const userInfoRes = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    const public_repos = userInfoRes.data.public_repos || 0;
    const followers = userInfoRes.data.followers || 0;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      const repos = response.data;
      if (repos.length === 0) break;

      allRepos = allRepos.concat(repos);

      for (const repo of repos) {
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const hasDocs = repo.description ? 1 : 0;
        score += stars * 1 + forks * 2 + hasDocs * 5;
      }

      if (repos.length < 100) break;
      page++;
    }

    const normalizedScore = Math.min(Math.round(score / 10), 100);
    console.log("✅ GitHub Score:", normalizedScore);

    return {
      platform: "GitHub",
      score: normalizedScore,
      public_repos,
      followers,
    };

  } catch (error) {
    console.error("❌ GitHub API error:", error.message);
    return { platform: "GitHub", error: "Failed to fetch GitHub data", score: 0 };
  }
};

module.exports = fetchGithubScore;
