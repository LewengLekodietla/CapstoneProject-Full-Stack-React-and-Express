const request = require("supertest");
const app = require("../server");  // Import the Express app for testing

// Describe block groups all test cases related to GitHub API routes
describe("GitHub API Routes", () => {
    
    // Test to check if the API correctly fetches GitHub user details
    test("GET /api/user/:username - Fetches GitHub user data", async () => {
        const res = await request(app).get("/api/user/octocat"); // Example username
        expect(res.statusCode).toBe(200); // Expect HTTP 200 (OK)
        expect(res.body).toHaveProperty("login", "octocat"); // Expect response to contain 'login' field
    });

    // Test to check if the API correctly fetches GitHub user repositories
    test("GET /api/repos/:username - Fetches user repositories", async () => {
        const res = await request(app).get("/api/repos/octocat"); // Example username
        expect(res.statusCode).toBe(200); // Expect HTTP 200 (OK)
        expect(Array.isArray(res.body)).toBe(true); // Expect response to be an array
    });

    // Test to check if the API correctly fetches the last 5 commits for a repo
    test("GET /api/commits/:username/:repo - Fetches last 5 commits", async () => {
        const res = await request(app).get("/api/commits/octocat/hello-world"); // Example repo
        expect(res.statusCode).toBe(200); // Expect HTTP 200 (OK)
        expect(Array.isArray(res.body)).toBe(true); // Expect response to be an array
    });

});