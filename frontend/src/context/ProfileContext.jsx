import { createContext, useState, useEffect, useContext } from 'react';

// Create and export the context directly
export const ProfileContext = createContext();

// Context Provider Component
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          name: "John Doe",
          username: "johndoe123",
          score: 85,
          leetcode: {
            username: "johndoe_leetcode",
            problems: 150
          },
          codeforces: {
            username: "johndoe_cf",
            problems: 200
          },
          linkedin: {
            username: "johndoe-linkedin",
            connections: "500+"
          },
          insights: [
            "Increase open-source contributions",
            "Improve LinkedIn engagement",
            "Solve more algorithmic problems"
          ]
        };
        setProfileData(mockData);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{ profileData, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for easier consumption
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};