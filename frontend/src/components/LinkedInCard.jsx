import './LinkedInCard.css';

const LinkedInCard = ({ profile }) => {
  return (
    <div className="linkedin-card glow-box">
      <div className="card-header">
        <h3>LinkedIn</h3>
        <div className="platform-logo ">💼</div>
      </div>
      <div className="card-content">
        <div className="platform-stat">
          <span className="stat-value">{profile.linkedin?.connections || '500+'}</span>
          <span className="stat-label">Connections</span>
        </div>
        <div className="platform-username">
          @{profile.linkedin?.username || 'linkedin-user'}
        </div>
      </div>
      <a 
        href={`https://linkedin.com/in/${profile.linkedin?.username}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="platform-link"
      >
        View Profile
      </a>
    </div>
  );
};

export default LinkedInCard;