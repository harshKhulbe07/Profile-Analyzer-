import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import Insights from '../components/Insights';
import './Insights.css';

const InsightsPage = () => {
  const { profileData, isLoading, error } = useContext(ProfileContext);

  if (isLoading) return (
    <section id="insights-section" className="page-section loading-section">
      <div className="loading-spinner"></div>
      <p>Generating insights...</p>
    </section>
  );

  if (error) return (
    <section id="insights-section" className="page-section error-section">
      <p className="error-message">{error}</p>
    </section>
  );

  return (
    <section id="insights-section" className="page-section">
      <div className="insights-container">
        <h2 className="section-title">Personalized Insights</h2>
        {profileData?.insights ? (
          <Insights insights={profileData.insights} />
        ) : (
          <p className="no-insights">No insights available. Complete your profile analysis first.</p>
        )}
      </div>
    </section>
  );
};

export default InsightsPage;