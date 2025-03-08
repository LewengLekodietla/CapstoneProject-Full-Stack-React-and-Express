import axios from "axios"; // Import Axios for making API calls

const API_BASE_URL = "http://localhost:8080/api"; // Base URL for the backend API

//Function to fetch user details from backend
export const fetchUser = (username) => axios.get(`${API_BASE_URL}/user/${username}`);

//Function to fetch repositories of a user from backend
export const fetchRepos = (username) => axios.get(`${API_BASE_URL}/repos/${username}`);

//Function to fetch the last 5 commits of a repository from backend
export const fetchCommits = (username, repo) => axios.get(`${API_BASE_URL}/commits/${username}/${repo}`);