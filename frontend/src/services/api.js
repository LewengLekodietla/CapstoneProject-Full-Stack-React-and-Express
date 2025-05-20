const axios = require("axios");

const API_BASE = "http://localhost:8080/api";

// Fetch user profile data
const fetchUserData = async (username) => {
  const res = await axios.get(`${API_BASE}/user/${username}`);
  return res.data;
};

// Fetch user's public repositories
const fetchRepos = async (username) => {
  const res = await axios.get(`${API_BASE}/user/${username}/repos`);
  return res.data;
};

// Fetch last 5 commits for a given repository
const fetchCommits = async (username, repo) => {
  const res = await axios.get(`${API_BASE}/user/${username}/repos/${repo}/commits`);
  return res.data;
};

// Export all as a grouped object (optional)
module.exports =  {
  fetchUserData,
  fetchRepos,
  fetchCommits,
};