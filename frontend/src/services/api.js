import axios from "axios"; // Import Axios for making API calls

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

//Configure Axios instance with timeout
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Set timeout of 5 seconds
});

//Function to fetch user details from backend (with error handling)
export const fetchUser = async (username) => {
  try {
    const response = await apiClient.get(`/user/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Ensure the calling function knows about the failure
  }
};

//Function to fetch repositories of a user (with caching)
export const fetchRepos = async (username) => {
  try {
    const response = await apiClient.get(`/repos/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

//Function to fetch the last 5 commits of a repository (with error handling)
export const fetchCommits = async (username, repo) => {
  try {
    const response = await apiClient.get(`/commits/${username}/${repo}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    throw error;
  }
};