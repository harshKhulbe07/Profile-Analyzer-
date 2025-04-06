import { useProfileContext } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import ScoreCard from '../components/ScoreCard';
import LeetCodeCard from '../components/LeetCodeCard';
import CodeForcesCard from '../components/CodeForcesCard';
import LinkedInCard from '../components/LinkedInCard';
import './Profile.css';

const Profile = () => {
  const { profileData, isLoading, error } = useProfileContext();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <h1 className="page-title">Developer Profile</h1>
      <div className="profile-grid">
        <ProfileCard profile={profileData} />
        <ScoreCard score={profileData.score} />
        <LeetCodeCard profile={profileData} />
        <CodeForcesCard profile={profileData} />
        <LinkedInCard profile={profileData} />
      </div>
    </div>
  );
};

export default Profile;