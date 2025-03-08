require("dotenv").config();
const axios = require("axios"); // Import Axios for making HTTP requests

const GITHUB_API = "https://api.github.com"; // Base URL for GitHub API
const HEADERS = { Authorization: `token ${process.env.GITHUB_TOKEN}` }; //Use GitHub Token for authentication

//Get GitHub User Details
exports.getUser = async (req, res) => {
    try {
        const { username } = req.params; // Extract username from request parameters
        const response = await axios.get(`${GITHUB_API}/users/${username}`, { headers: HEADERS }); // Fetch user data from GitHub API
        res.json(response.data); // Send the user data as a JSON response
    } catch (error) {
        res.status(404).json({ error: "User not found" }); // Handle error if user is not found
    }
};

//Get User Repositories
exports.getRepos = async (req, res) => {
    try {
        const { username } = req.params; // Extract username from request parameters
        const response = await axios.get(`${GITHUB_API}/users/${username}/repos`); // Fetch repositories from GitHub API
        res.json(response.data); // Send the repositories as a JSON response
    } catch (error) {
        res.status(404).json({ error: "Repositories not found" }); // Handle error if repositories are not found
    }
};

//Get Last 5 Commits for a Repository
exports.getCommits = async (req, res) => {
    try {
        const { username, repo } = req.params; // Extract username and repo name from request parameters
        const response = await axios.get(`${GITHUB_API}/repos/${username}/${repo}/commits?per_page=5`); // Fetch last 5 commits
        const commits = response.data.map(commit => ({
            message: commit.commit.message, // Extract commit message
            date: commit.commit.author.date // Extract commit date
        }));
        res.json(commits); // Send commit details as JSON response
    } catch (error) {
        res.status(404).json({ error: "Commits not found" }); // Handle error if commits are not found
    }
};