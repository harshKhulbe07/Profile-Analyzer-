import './GitHubCard.css';

const GitHubCard = ({ profile }) => {
  return (
    <div className="github-card">
      <div className="card-header">
        <h3>GitHub Profile</h3>
        <div className="github-logo">🐙</div>
      </div>
      <div className="card-content">
        <div className="stat">
          <span className="stat-value">{profile.repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.stars || 42}</span>
          <span className="stat-label">Stars</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.followers || 28}</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>
      <a 
        href={`https://github.com/${profile.username}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="profile-link"
      >
        View Profile →
      </a>
    </div>
  );
};

export default GitHubCard;  