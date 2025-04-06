import ContributorCard from '../components/ContributorCard';
import './Contributors.css';

const Contributors = () => {
  const contributors = [
    {
      name: "Harsh Khuble",
      role: "Full Stack Developer",
      github: "pfar",
      leetcode: "pr",
      codeforces: "ajf"
    },
    {
      name: "Uday Dhakar",
      role: "Competitive Programmer",
      github: "afdf-af-cp",
      leetcode: "af",
      codeforces: "af"
    },
    {
      name: "Ridhhi Ladda",
      role: "Frontend Developer",
      github: "noftel-dev",
      leetcode: "okf",
      codeforces: "kfjj"
    }
  ];

  return (
    <section id="contributors-section" className="page-section">
      <div className="contributors-container">
        <h2 className="section-title">Our Contributors</h2>
        <div className="contributors-grid">
          {contributors.map((contributor, index) => (
            <ContributorCard key={index} contributor={contributor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;