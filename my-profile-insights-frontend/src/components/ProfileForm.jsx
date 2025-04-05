import React, { useState } from "react";
import axios from "axios";

const ProfileForm = ({ onResults }) => {
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [codeforcesUsername, setCodeforcesUsername] = useState("");
  const [linkedinUsername, setLinkedinUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/analyze", {
        githubUsername,
        leetcodeUsername,
        codeforcesUsername,
        linkedinStats: {
          score: 60,
          followers: 250,
          endorsements: 15,
        },
      });

      onResults(res.data);
    } catch (err) {
      setError("Failed to fetch insights. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="GitHub Username"
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
        className="p-2 border rounded bg-blue-50"
      />
      <input
        type="text"
        placeholder="LeetCode Username"
        value={leetcodeUsername}
        onChange={(e) => setLeetcodeUsername(e.target.value)}
        className="p-2 border rounded bg-blue-50"
      />
      <input
        type="text"
        placeholder="Codeforces Username"
        value={codeforcesUsername}
        onChange={(e) => setCodeforcesUsername(e.target.value)}
        className="p-2 border rounded bg-blue-50"
      />
      <input
        type="text"
        placeholder="LinkedIn Username"
        value={linkedinUsername}
        onChange={(e) => setLinkedinUsername(e.target.value)}
        className="p-2 border rounded bg-blue-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Generate Insights"}
      </button>
      {error && (
        <div className="col-span-2 text-red-700 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
