import './ProfileCard.css';

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card glow-box">
      <div className="profile-header">
        <h2>{profile.name}</h2>
        <p className="username">@{profile.username}</p>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-label">Repositories</span>
          <span className="stat-value">{profile.repos}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Contributions</span>
          <span className="stat-value">{profile.contributions}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;