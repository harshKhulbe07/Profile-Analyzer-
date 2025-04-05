import { useState } from "react";
import axios from "axios";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    githubUsername: "",
    codeforcesUsername: "",
    leetcodeUsername: "",
    linkedinUsername: "",
  });

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInsights(null);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", formData);
      setInsights(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderScoreCard = (title, value) => (
    <div className="bg-white shadow-md rounded p-4 w-full sm:w-1/2 md:w-1/3">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold text-blue-600">{value ?? "N/A"}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Developer Profile Analyzer</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="githubUsername"
            placeholder="GitHub Username"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="codeforcesUsername"
            placeholder="Codeforces Username"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="leetcodeUsername"
            placeholder="LeetCode Username"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="linkedinUsername"
            placeholder="LinkedIn Username"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-6">{error}</div>
      )}

      {insights && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Scores</h2>
          <div className="flex flex-wrap gap-4">
            {renderScoreCard("GitHub Score", insights.githubScore)}
            {renderScoreCard("LeetCode Score", insights.leetcodeScore)}
            {renderScoreCard("Codeforces Score", insights.codeforcesScore)}
            {renderScoreCard("LinkedIn Score", insights.linkedinScore)}
            {renderScoreCard("Net Score", insights.netScore)}
          </div>

          {insights.geminiInsights && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-2">Gemini AI Insights</h2>
              <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
                {insights.geminiInsights}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Raw JSON (for Debugging)</h2>
            <pre className="bg-black text-green-300 p-4 rounded overflow-x-auto text-xs">
              {JSON.stringify(insights, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
