import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <section id="home-section" className="page-section">
      <div className="home-container">
        <div className="hero-content">
          <h1 className="hero-title glow-text">
            Digital Profile <span className="highlight">Analyzer</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered insights for your professional growth
          </p>
          <div className="cta-container">
            <Link to="#profile" className="cta-button pulse-animation">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="ai-orb"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;