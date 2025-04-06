import './ContributorCard.css';

const ContributorCard = ({ contributor }) => {
  return (
    <div className="contributor-card">
      <div className="contributor-header">
        <h3>{contributor.name}</h3>
        <p className="role">{contributor.role}</p>
      </div>
      <div className="contributor-links">
        <a href={`https://github.com/${contributor.github}`} target="_blank" rel="noopener noreferrer">
          <span className="icon">👨‍💻</span> GitHub: {contributor.github}
        </a>
        <a href={`https://leetcode.com/${contributor.leetcode}/`} target="_blank" rel="noopener noreferrer">
          <span className="icon">🧠</span> LeetCode: {contributor.leetcode}
        </a>
        <a href={`https://codeforces.com/profile/${contributor.codeforces}`} target="_blank" rel="noopener noreferrer">
          <span className="icon">⚡</span> Codeforces: {contributor.codeforces}
        </a>
      </div>
    </div>
  );
};

export default ContributorCard;