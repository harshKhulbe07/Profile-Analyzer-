const axios = require('axios');

const apiKey = process.env.OPENROUTER_API_KEY;
const generateInsights = async (scores, extras) => {
  const prompt = `
  Based on the following profile data:
  GitHub Score: ${scores.githubScore}, Commits: ${extras.commits}, PRs: ${extras.prs}, Active Repos: ${extras.repos}
  LinkedIn Score: ${scores.linkedinScore}, Followers: ${extras.followers}, Endorsements: ${extras.endorsements}
  Coding Score: ${scores.codingScore}, LeetCode Solved: ${extras.lcSolved}, Codeforces Rating: ${extras.cfRating}

  Provide:
  1. Top strengths
  2. Main weaknesses
  3. Personalized recommendations for improvement in GitHub, LinkedIn, and Coding skills.

  Format response as JSON with keys: strengths, weaknesses, recommendations.`;

  const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
    model: 'openai/gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  return JSON.parse(res.data.choices[0].message.content);
};

module.exports = { generateInsights };