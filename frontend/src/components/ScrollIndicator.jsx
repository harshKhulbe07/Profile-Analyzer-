import { Link } from 'react-router-dom';
import useScrollTo from '../hooks/useScrollTo';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const activeSection = useScrollTo(['home-section', 'profile-section', 'insights-section', 'contributors-section']);

  const getActiveClass = (section) => 
    activeSection === `${section}-section` ? 'active' : '';

  return (
    <div className="scroll-indicator">
      <Link 
        to="#home" 
        className={`indicator-dot ${getActiveClass('home')}`}
        aria-label="Go to Home section"
      />
      <Link 
        to="#profile" 
        className={`indicator-dot ${getActiveClass('profile')}`}
        aria-label="Go to Profile section"
      />
      <Link 
        to="#insights"
        className={`indicator-dot ${getActiveClass('insights')}`}
        aria-label="Go to Insights section"
      />
      <Link 
        to="#contributors"
        className={`indicator-dot ${getActiveClass('contributors')}`}
        aria-label="Go to contributors section"
      />
    </div>
  );
};

export default ScrollIndicator;