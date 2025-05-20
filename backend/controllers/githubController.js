const axios = require("axios"); // Import Axios for making HTTP requests

const GITHUB_API = "https://api.github.com"; // Base URL for GitHub API
const HEADERS = { Authorization: `token ${process.env.GITHUB_TOKEN}` }; // Use GitHub Token for authentication

// Get GitHub User Details
const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params; // Extract username from request parameters
    const response = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers: HEADERS,
    }); // Fetch user data from GitHub API
    res.json(response.data); // Send the user data as a JSON response
  } catch (error) {
    res.status(404).json({ error: "User not found" }); // Handle error if user is not found
  }
};

// Get User Repositories
const getUserRepos = async (req, res) => {
  try {
    const { username } = req.params; // Extract username from request parameters
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      headers: HEADERS,
    }); // Fetch repositories from GitHub API
    res.json(response.data); // Send the repositories as a JSON response
  } catch (error) {
    res.status(404).json({ error: "Repositories not found" }); // Handle error if repositories are not found
  }
};

// Get Last 5 Commits for a Repository
const getRepoCommits = async (req, res) => {
  try {
    const { username, repo } = req.params; // Extract username and repo name from request parameters
    const response = await axios.get(
      `${GITHUB_API}/repos/${username}/${repo}/commits?per_page=5`,
      { headers: HEADERS }
    ); // Fetch the last 5 commits from GitHub API
    res.json(response.data); // Send the commits as a JSON response
  } catch (error) {
    res.status(404).json({ error: `Commits not found for repository: ${req.params.repo}` }); // Handle error if commits not found
  }
};

module.exports = { getUserProfile, getUserRepos, getRepoCommits };