import './ScoreCard.css';

const ScoreCard = ({ score }) => {
  return (
    <div className="score-card glow-box">
      <h3>Recruiter Readiness Score</h3>
      <div className="score-circle">
        <span className="score-value">{score}</span>
        <span className="score-max">/100</span>
      </div>
      <div className="score-description">
        {score >= 80 ? 'Excellent profile!' : 
         score >= 60 ? 'Good potential' : 
         'Needs improvement'}
      </div>
    </div>
  );
};

export default ScoreCard;