import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import axios from "axios";

//Mock axios globally
jest.mock("axios");

const mockUser = {
  login: "test-user",
  name: "Test User",
  avatar_url: "https://example.com/avatar.png",
  bio: "This is a test user.",
  html_url: "https://github.com/test-user",
};

const mockRepos = [
  { name: "repo-one", id: 1, description: "Repo One Description" },
  { name: "repo-two", id: 2, description: "Repo Two Description" },
];

const mockCommits = [
  { message: "Initial commit", date: "2023-09-01T12:00:00Z" },
];

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={[`/profile/${mockUser.login}`]}>
      <Routes>
        <Route path="/profile/:username" element={<UserProfile user={mockUser} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("UserProfile Component", () => {
  // Suppress console.error messages during tests
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // Restore console and mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("renders user repositories and latest commits on click", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes(`/users/${mockUser.login}/repos`)) {
        return Promise.resolve({ data: mockRepos });
      }
      if (url.includes(`/repos/${mockUser.login}/repo-one/commits`)) {
        return Promise.resolve({
          data: [{ commit: { message: "Initial commit", author: { date: "2023-09-01T12:00:00Z" } } }],
        });
      }
    });

    renderWithRouter();

    expect(await screen.findByText(/repo-one/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("View Commits"));

    expect(await screen.findByText(/Initial commit/i)).toBeInTheDocument();
  });

  test("displays error message if fetchRepos fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch repos"));

    renderWithRouter();

    expect(await screen.findByText(/Failed to fetch repositories/i)).toBeInTheDocument();
  });

  test("displays error message if fetchCommits fails", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes(`/users/${mockUser.login}/repos`)) {
        return Promise.resolve({ data: mockRepos });
      }
      if (url.includes(`/repos/${mockUser.login}/repo-one/commits`)) {
        return Promise.reject(new Error("Commit fetch failed"));
      }
    });

    renderWithRouter();

    expect(await screen.findByText(/repo-one/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("View Commits"));

    expect(await screen.findByText(/Failed to fetch commits/i)).toBeInTheDocument();
  });

  test("handles empty repo list", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    renderWithRouter();

    expect(await screen.findByText(/No repositories found/i)).toBeInTheDocument();
  });
});