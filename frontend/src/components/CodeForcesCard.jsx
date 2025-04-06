import './CodeForcesCard.css';

const CodeForcesCard = ({ profile }) => {
  return (
    <div className="codeforces-card glow-box">
      <div className="card-header">
        <h3>CodeForces</h3>
        <div className="platform-logo">⚡</div>
      </div>
      <div className="card-content">
        <div className="platform-stat">
          <span className="stat-value">{profile.codeforces?.problems || 200}Problems Solved</span>
        </div>
        <div className="platform-username">
          @{profile.codeforces?.username || 'cf_user'}
        </div>
      </div>
      <a 
        href={`https://codeforces.com/profile/${profile.codeforces?.username}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="platform-link"
      >
        View Profile
      </a>
    </div>
  );
};

export default CodeForcesCard;