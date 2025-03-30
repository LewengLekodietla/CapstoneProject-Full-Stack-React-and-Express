const request = require("supertest");
const app = require("../server");  // Import the Express app for testing

// Describe block groups all test cases related to GitHub API routes
describe("GitHub API Routes", () => {
    
    // Test to check if the API correctly fetches GitHub user details
    test("GET /api/user/:username returns user data", async () => {
        const res = await request(app).get("/api/user/octocat");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("login", "octocat");
      });

    // Test to check if the API correctly fetches GitHub user repositories
    test("GET /api/repos/:username returns repo list", async () => {
        const res = await request(app).get("/api/repos/octocat");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

    // Test to check if the API correctly fetches the last 5 commits for a repo
    test("GET /api/commits/:username/:repo returns last 5 commits", async () => {
        const res = await request(app).get("/api/commits/octocat/hello-world");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

});