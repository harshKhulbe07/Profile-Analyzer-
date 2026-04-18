const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧠 Build structured prompt
function buildPrompt(profile) {
  return `
You are an expert career coach analyzing a developer profile.

## Developer Profile

### GitHub Stats:
- Public Repos: ${profile.public_repos || 0}
- Followers: ${profile.githubFollowers || profile.followers || 0}

### LeetCode Stats:
- Total Solved: ${profile.totalSolved || 0}
  - Easy: ${profile.easySolved || 0}
  - Medium: ${profile.mediumSolved || 0}
  - Hard: ${profile.hardSolved || 0}
- Contest Rating: ${profile.contestRating || 0}

### Codeforces Stats:
- Rating: ${profile.codeforcesRating || 0}

### LinkedIn Stats:
- Followers: ${profile.linkedinConnections || 0}
- Endorsements: ${profile.linkedinEndorsements || 0}

---

## Instructions:
Analyze the profile and provide:

## Strengths
- (Top 3 strengths with reasoning)

## Areas for Improvement
- (Top 3 weaknesses with reasoning)

## Recommendations
- (Clear, actionable steps to improve)

Keep the response:
- Concise
- Practical
- Specific (avoid generic advice)
- Easy to read
`;
}

// 🤖 Generate AI insights
async function generateInsights(profileData) {
  try {
    if (!profileData || typeof profileData !== "object") {
      throw new Error("Invalid profile data supplied.");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      },
    });

    const prompt = buildPrompt(profileData);

    // DEBUG (optional)
    console.log("🧠 Final Prompt to Gemini:\n", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insights = response.text();

    return insights;

  } catch (error) {
    console.error("❌ Gemini insight generation error:", error.message);

    // ✅ Safe fallback (prevents app crash)
    return `
⚠️ Unable to generate AI insights at the moment.

Possible reasons:
- API quota exceeded
- Network issue
- Temporary service issue

Please try again later.
`;
  }
}

module.exports = generateInsights;