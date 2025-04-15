const axios = require("axios");

//You can use an environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

//Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Optional timeout for better error handling
});

//Fetch user repositories
const fetchRepos = (username) => {
  return apiClient.get(`/users/${username}/repos`);
};

//Fetch last commits for a given repository
const fetchCommits = (username, repo) => {
  return apiClient.get(`/repos/${username}/${repo}/commits`);
};

module.exports = {
  fetchRepos,
  fetchCommits,
};