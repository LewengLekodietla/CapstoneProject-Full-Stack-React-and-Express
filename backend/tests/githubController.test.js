require("dotenv").config(); // Load environment variables from .env file

// Import necessary modules for testing
const request = require("supertest");
const express = require("express");
const routes = require("../routes");

// Set up an Express app for testing the GitHub proxy routes
const app = express();
app.use(express.json());
app.use("/api", routes);

// Integration tests for GitHub API proxy routes
describe("GitHub API Proxy Routes - Integration Tests", () => {
  // Define test usernames and repositories
  const validUsername = "octocat";
  const invalidUsername = "thisuserdoesnotexist123456";
  const validRepo = "Spoon-Knife";
  const invalidRepo = "invalid-repo-xyz";

  // Test suite for GET /api/user/:username endpoint
  describe("GET /api/user/:username", () => {
    it("returns user data for a valid GitHub username", async () => {
      // Send request for valid user and verify response
      const res = await request(app).get(`/api/user/${validUsername}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("login", validUsername);
    });

    it("returns 404 for an invalid GitHub username", async () => {
      // Send request for invalid user and expect 404
      const res = await request(app).get(`/api/user/${invalidUsername}`);
      expect(res.statusCode).toBe(404);
    });
  });

  // Test suite for GET /api/user/:username/repos endpoint
  describe("GET /api/user/:username/repos", () => {
    it("returns repositories for a valid GitHub user", async () => {
      const res = await request(app).get(`/api/user/${validUsername}/repos`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("returns 404 for repositories of a non-existent user", async () => {
      const res = await request(app).get(`/api/user/${invalidUsername}/repos`);
      expect(res.statusCode).toBe(404);
    });
  });

  // Test suite for GET /api/user/:username/repos/:repo/commits endpoint
  describe("GET /api/user/:username/repos/:repo/commits", () => {
    it("returns commits for a valid repo of a valid user", async () => {
      // Fetch commits from a valid repo and ensure response is an array
      const res = await request(app).get(
        `/api/user/${validUsername}/repos/${validRepo}/commits`
      );
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("returns 404 for an invalid repo of a valid user", async () => {
      // Attempt to fetch commits from an invalid repo and expect 404
      const res = await request(app).get(
        `/api/user/${validUsername}/repos/${invalidRepo}/commits`
      );
      expect(res.statusCode).toBe(404);
    }, 10000); //Increase timeout for potentially long API response
  });
});
