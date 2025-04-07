document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
    const scoresDiv = document.getElementById("scores");
    const insightsDiv = document.getElementById("insights");
    const resultsSection = document.getElementById("results");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const githubUsername = document.getElementById("githubUsername").value.trim();
      const leetcodeUsername = document.getElementById("leetcodeUsername").value.trim();
      const codeforcesUsername = document.getElementById("codeforcesUsername").value.trim();
      const linkedinFollowers = parseInt(document.getElementById("linkedinFollowers").value);
      const linkedinEndorsements = parseInt(document.getElementById("linkedinEndorsements").value);
  
      const requestBody = {
        githubUsername,
        leetcodeUsername,
        codeforcesUsername,
        linkedinFollowers,
        linkedinEndorsements
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) {
          throw new Error("Server responded with an error");
        }
  
        const data = await response.json();
        console.log("Response:", data);
        renderResults(data);
        resultsSection.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Error:", error);
        alert("Error fetching data. Please check input or server.");
      }
    });
  
    function renderResults(data) {
        const { scores, insights } = data;
      
        // Show cards with real score data
        document.getElementById("github-score").textContent = scores.githubScore.score ?? "--";
        document.getElementById("leetcode-score").textContent = scores.leetcodeScore.score ?? "--";
        document.getElementById("codeforces-score").textContent = scores.codeforcesScore.score ?? "--";
        document.getElementById("linkedin-score").textContent = scores.linkedinScore ?? "--";
      
        // Animate progress bars
        animateProgressBar("github-progress", scores.githubScore.score);
        animateProgressBar("leetcode-progress", scores.leetcodeScore.score);
        animateProgressBar("codeforces-progress", scores.codeforcesScore.score);
        animateProgressBar("linkedin-progress", scores.linkedinScore);
      
        // Render AI-generated insights
        const insightsDiv = document.getElementById("insights");
        insightsDiv.innerHTML = `
          <div class="insights-box">
            <h3>Insights & Recommendations</h3>
            <div class="markdown-insights">${marked.parse(insights)}</div>
          </div>
        `;
      
        // Show the Results section
        document.getElementById("results").style.display = "block";
      }
      
      // Helper for animated progress bars
      function animateProgressBar(id, value) {
        const progress = document.getElementById(id);
        if (progress) {
          progress.style.width = Math.min(value, 100) + "%";
        }
      }
      
  });
  