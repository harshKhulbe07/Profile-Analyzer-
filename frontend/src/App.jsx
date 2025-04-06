import { BrowserRouter as Router } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import ScrollIndicator from "./components/ScrollIndicator";
import './App.css';
import Contributors from "./pages/Contributors";

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="app-wrapper">
          {/* Navigation Bar */}
          <Navbar />
          
          {/* Main Scroll Container */}
          <div className="scroll-container">
            {/* Home Section */}
            <section 
              id="home-section" 
              className="page-section"
              data-section="home"
            >
              <Home />
            </section>
            
            {/* Profile Section */}
            <section 
              id="profile-section" 
              className="page-section"
              data-section="profile"
            >
              <Profile />
            </section>
            
            {/* Insights Section */}
            <section 
              id="insights-section" 
              className="page-section"
              data-section="insights"
            >
              <Insights />
            </section>
            <section>
              <Contributors />
            </section>
          </div>
          
          {/* Scroll Indicator */}
          <ScrollIndicator />
        </div>
      </Router>
      
    </ProfileProvider>
  );
}

export default App;
