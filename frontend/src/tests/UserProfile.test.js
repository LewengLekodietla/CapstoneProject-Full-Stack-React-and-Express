// UserProfile.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import { fetchRepos, fetchCommits } from "../services/api";

// Automatically mock the API module
jest.mock("../services/api", () => ({
  fetchRepos: jest.fn(),
  fetchCommits: jest.fn(),
}));

describe("UserProfile Component", () => {
  const mockUser = { login: "test-user" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user profile with repositories", async () => {
    fetchRepos.mockResolvedValueOnce([
      { id: 1, name: "repo1", description: "A repo" },
    ]);

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    expect(await screen.findByText("repo1")).toBeInTheDocument();
    expect(screen.getByText("A repo")).toBeInTheDocument();
  });

  test("shows error if repo fetch fails", async () => {
    fetchRepos.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Failed to fetch repositories.")
    ).toBeInTheDocument();
  });

  test("shows message for empty repo list", async () => {
    fetchRepos.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("No repositories found.")
    ).toBeInTheDocument();
  });

  test("loads and displays commits on click", async () => {
    fetchRepos.mockResolvedValueOnce([
      { id: 1, name: "repo1", description: "Test repo" },
    ]);

    fetchCommits.mockResolvedValueOnce([
      { date: "2024-01-01T00:00:00Z", message: "Initial commit" },
    ]);

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    const viewCommitsButton = await screen.findByText("View Commits");
    fireEvent.click(viewCommitsButton);

    expect(
      await screen.findByText((text) => text.includes("Initial commit"))
    ).toBeInTheDocument();
  });
});
