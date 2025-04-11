document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const scoresDiv = document.getElementById("scores");
  const insightsDiv = document.getElementById("insights");
  const resultsSection = document.getElementById("results");
  const submitButton = form.querySelector('button[type="submit"]');

  // Add loading state to submit button
  const originalButtonText = submitButton.textContent;

  function setLoading(isLoading) {
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span class="loading"></span>
        Analyzing...
      `;
    } else {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }

  // Add input validation and feedback
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  });

  function renderResults(data) {
      const { scores, insights } = data;
    
      // Show cards with real score data
      document.getElementById("github-score").textContent = scores.githubScore.score ?? "--";
      document.getElementById("leetcode-score").textContent = scores.leetcodeScore.score ?? "--";
      document.getElementById("codeforces-score").textContent = scores.codeforcesScore.score ?? "--";
      document.getElementById("linkedin-score").textContent = scores.linkedinScore ?? "--";
    
    // Animate progress bars with staggered delay
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate progress bars with staggered delay
    setTimeout(() => {
      animateProgressBar("github-progress", scores.githubScore.score);
    }, 100);
    setTimeout(() => {
      animateProgressBar("leetcode-progress", scores.leetcodeScore.score);
    }, 300);
    setTimeout(() => {
      animateProgressBar("codeforces-progress", scores.codeforcesScore.score);
    }, 500);
    setTimeout(() => {
      animateProgressBar("linkedin-progress", scores.linkedinScore);
    }, 700);
    
    // Render AI-generated insights with animated background
      const insightsDiv = document.getElementById("insights");
    insightsDiv.style.opacity = '0';
      insightsDiv.innerHTML = `
        <div class="insights-box">
          <h3>Insights & Recommendations</h3>
          <div class="markdown-insights">${marked.parse(insights)}</div>
        </div>
      `;
    setTimeout(() => {
      insightsDiv.style.transition = 'opacity 0.5s ease';
      insightsDiv.style.opacity = '1';
    }, 900);
    
    // Show the Results section with fade-in effect
      document.getElementById("results").style.display = "block";
    document.getElementById("results").style.opacity = '0';
    setTimeout(() => {
      document.getElementById("results").style.transition = 'opacity 0.5s ease';
      document.getElementById("results").style.opacity = '1';
    }, 100);
    }
    
  // Enhanced progress bar animation
    function animateProgressBar(id, value) {
      const progress = document.getElementById(id);
      if (progress) {
      progress.style.width = '0';
      setTimeout(() => {
        progress.style.width = Math.min(value, 100) + "%";
      }, 100);
    }
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax background
  const body = document.body;
  const parallaxBg = document.createElement('div');
  parallaxBg.className = 'parallax-bg';
  body.insertBefore(parallaxBg, body.firstChild);

  // Add floating elements
  for (let i = 0; i < 3; i++) {
    const floating = document.createElement('div');
    floating.className = 'floating';
    body.appendChild(floating);
  }

  // Mouse move parallax effect
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    parallaxBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });

  // Add scroll-based animations
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
    observer.observe(section);
  });
});
