import axios from 'axios';

//You can use an environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

//Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Optional timeout for better error handling
});

// Fetch GitHub user details
export const fetchUser = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

//Fetch user repositories
export const fetchRepos = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return response.data;
};

//Fetch last 5 commits for a repository
export const fetchCommits = async (username, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/commits`);
  return response.data.slice(0, 5); 
};

// Export all functions as a single object (useful for mocking in tests)
const api = {
  fetchUser,
  fetchRepos,
  fetchCommits,
};

export default api;