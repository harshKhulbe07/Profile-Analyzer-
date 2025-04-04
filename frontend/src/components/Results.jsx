import React from 'react';

const Results = ({ scores, insights }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Scores</h2>
      <ul>
        <li><strong>GitHub Score:</strong> {scores.githubScore}</li>
        <li><strong>LinkedIn Score:</strong> {scores.linkedinScore}</li>
        <li><strong>Coding Score:</strong> {scores.codingScore}</li>
      </ul>

      <h2>Insights</h2>
      <h4>Strengths:</h4>
      <ul>
        {insights.strengths.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h4>Weaknesses:</h4>
      <ul>
        {insights.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
      </ul>

      <h4>Recommendations:</h4>
      <ul>
        {insights.recommendations.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
};

export default Results;