import { useState, useEffect } from 'react';

const useScrollTo = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adding offset
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            window.history.replaceState(null, null, `#${sectionId.replace('-section', '')}`);
            break;
          }
        }
      }
    };

    // Handle initial hash
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(`${hash}-section`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(`${hash}-section`);
        }
      }
    };

    handleInitialHash();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleInitialHash);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleInitialHash);
    };
  }, [sectionIds]);

  return activeSection;
};

export default useScrollTo;