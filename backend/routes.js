const express = require("express"); // Import Express framework
const {
  getUserProfile,
  getUserRepos,
  getRepoCommits,
} = require("./controllers/githubController.js"); // Import controller functions

const router = express.Router(); // Create an instance of Express Router

// Route to get GitHub user details
router.get("/user/:username", getUserProfile);

// Route to get GitHub repositories for a user
router.get("/user/:username/repos", getUserRepos);

// Route to get last 5 commits for a repository
router.get("/user/:username/repos/:repo/commits", getRepoCommits);

module.exports = router; // Export router to use in the main server file