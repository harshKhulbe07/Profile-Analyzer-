# 💻 AI-Powered Developer Profile Analyzer

An AI-powered web app that analyzes a developer's profile using their coding and professional data from **GitHub**, **LeetCode**, **Codeforces**, and **LinkedIn**, then generates scores and personalized insights with the help of **Gemini AI API**.

---

## 🔍 Features

- 🔢 **Platform Scores**:
  - **GitHub**: Followers, public repositories, contributions
  - **LeetCode**: Problems solved (easy, medium, hard), acceptance rate, reputation
  - **Codeforces**: Rating, rank, contributions
  - **LinkedIn**: Followers and skill endorsements

- 🧠 **AI Insights**:
  - Personalized strengths and weaknesses
  - Actionable career recommendations
  - Summary powered by **Gemini AI API**

- 🎨 **User-Friendly Frontend**:
  - Clean, responsive design
  - Result cards, animated progress bars
  - Contributors section

---

## 🌐 APIs Used

- 🔗 **GitHub API** – for public profile stats and repositories  
- ⚡ **LeetCode API** (unofficial) – for problem-solving stats  
- 🧮 **Codeforces API** – for ratings and user data  
- 🧠 **Gemini API** – for generating natural language insights based on profile data  

---
## 🛠️ How to Run Locally

### Backend (Node.js)

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Start the server:
   ```bash
   node server.js
4. The backend server will start at:
   ```bash
   http://localhost:5000
⚠️ Important: Make sure to add your Gemini API Key in a .env file or a config file as required by your backend.

---

## Frontend
 -Open the project in VS Code.
 -Install the Live Server extension if you haven't already.
-Right-click index.html and select "Open with Live Server".

