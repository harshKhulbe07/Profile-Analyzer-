import { Link } from 'react-router-dom';
import useScrollTo from '../hooks/useScrollTo';
import Profile from '../pages/Profile.jsx'
import './Navbar.css';

const Navbar = () => {
  const activeSection = useScrollTo(['home-section', 'profile-section', 'insights-section', 'contributors-section']);

  const getActiveClass = (section) => 
    activeSection === `${section}-section` ? 'active' : '';

  return (
    <nav className="navbar">  
      <div className="navbar-container">
        <h1 className="navbar-logo glow-text">Profile Analyzer</h1>
        <div className="navbar-links">
          <Link 
            to="./pages/Home" 
            className={`navbar-link ${getActiveClass('Home')}`}
          >
            Home
          </Link>
          
          <Link 
            to="./pages/Profile" 
            className={`navbar-link ${getActiveClass('profile')}`}
          >
            Profile
          </Link>
          <Link 
            to="#insights" 
            className={`navbar-link ${getActiveClass('insights')}`}
          >
            Insights
          </Link>
          <Link 
            to="#contributors" 
            className={`navbar-link ${getActiveClass('contributors')}`}
          >
            Contributors
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;