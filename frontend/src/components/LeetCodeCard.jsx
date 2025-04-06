import './LeetCodeCard.css';

const LeetCodeCard = ({ profile }) => {
  return (
    <div className="leetcode-card glow-box">
      <div className="card-header">
        <h3>LeetCode</h3>
        <div className="platform-logo">🧠</div>
      </div>
      <div className="card-content">
        <div className="platform-stat">
          <span className="platform-stat">{profile.leetcode?.problems || 150} Problems Solved </span>
          {/* <span className="stat-label"></span> */}
        </div>
        <div className="platform-username">
          @{profile.leetcode?.username || 'user123'}
        </div>
      </div>
      <a 
        href={`https://leetcode.com/${profile.leetcode?.username}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="platform-link"
      >
        View Profile
      </a>
    </div>
  );
};

export default LeetCodeCard;