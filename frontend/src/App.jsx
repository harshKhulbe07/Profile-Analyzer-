import React, { useState } from 'react';
import Results from './components/Results.jsx';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', {
        githubUsername: 'octocat',
        leetcodeUsername: 'sampleuser',
        linkedinStats: {
          score: 70,
          followers: 500,
          endorsements: 20,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Developer Profile Analyzer</h1>
      <button onClick={handleAnalyze}>Run Analysis</button>
      {data && <Results scores={data.scores} insights={data.insights} />}
    </div>
  );
}

export default App;