const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to build structured prompt
function buildPrompt(profile) {
  return `
## Developer Profile

### GitHub Stats:
- Public Repos: ${profile.public_repos}
- Followers: ${profile.followers}
- Contributions (past year): ${profile.contributions}

### LeetCode Stats:
- Total Solved: ${profile.totalSolved}
  - Easy: ${profile.easySolved}
  - Medium: ${profile.mediumSolved}
  - Hard: ${profile.hardSolved}
- Contest Rating: ${profile.contestRating}

### LinkedIn Stats:
- Connections: ${profile.linkedinConnections || "N/A"}
- Endorsements: ${profile.linkedinEndorsements || "N/A"}

---

## Instructions:
You are a career coach analyzing a developer profile. Based on the stats above, return:

1. **Top 3 Strengths** (with reasoning)
2. **Top 3 Areas for Improvement**
3. **Actionable Personalized Recommendations**

Respond in **markdown format**.
`;
}

async function generateInsights(profileData) {
  try {
    if (!profileData || typeof profileData !== 'object') {
      throw new Error("Invalid profile data supplied.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = buildPrompt(profileData);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insights = response.text();

    return insights;
  } catch (error) {
    console.error("❌ Gemini insight generation error:", error.message);
    throw new Error("Failed to generate insights");
  }
}

module.exports =  generateInsights ;
