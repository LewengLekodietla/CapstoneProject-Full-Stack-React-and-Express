const express = require("express"); // Import Express framework
const {
  getUser,
  getRepos,
  getCommits,
} = require("./controllers/githubController"); // Import controller functions

const router = express.Router(); // Create an instance of Express Router

//Route to get GitHub user details
router.get("/user/:username", getUser);

//Route to get GitHub repositories for a user
router.get("/repos/:username", getRepos);

//Route to get last 5 commits for a repository
router.get("/commits/:username/:repo", getCommits);

module.exports = router; // Export router to use in the main server file
