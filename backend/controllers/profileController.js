import fetchLeetcodeScore from "../utils/fetchLeetcodeScore.js";
import fetchCodeforcesScore from "../utils/fetchCodeforcesScore.js";
import fetchGithubScore from "../utils/fetchGithubScore.js";
import fetchLinkedInScore from "../utils/fetchLinkedinScore.js";
import generateInsights from "../utils/generateInsights.js";

export const analyzeDeveloperProfile = async (req, res) => {
  try {
    const { leetcodeUsername, codeforcesUsername, githubUsername, linkedinProfileUrl } = req.body;

    const [leetcodeData, codeforcesData, githubData, linkedinData] = await Promise.all([
      fetchLeetcodeScore(leetcodeUsername),
      fetchCodeforcesScore(codeforcesUsername),
      fetchGithubScore(githubUsername),
      fetchLinkedInScore(linkedinProfileUrl)
    ]);

    const combinedData = {
      ...leetcodeData,
      ...codeforcesData,
      ...githubData,
      ...linkedinData
    };

    const insights = await generateInsights(combinedData);

    res.json({
      platformScores: {
        LeetCode: leetcodeData.score,
        Codeforces: codeforcesData.score,
        GitHub: githubData.score,
        LinkedIn: linkedinData.score,
      },
      insights,
    });
  } catch (error) {
    console.error("Error analyzing profile:", error);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
};
