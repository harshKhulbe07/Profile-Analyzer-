import './Insights.css';

const Insights = ({ insights }) => {
  return (
    <div className="insights-card glow-box">
      <h3>Insights & Recommendations</h3>
      <ul className="insights-list">
        {insights.map((insight, index) => (
          <li key={index} className="insight-item">
            <div className="insight-icon">💡</div>
            <div className="insight-text">{insight}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Insights;