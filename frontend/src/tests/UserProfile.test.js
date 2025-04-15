
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfile from "../pages/UserProfile";
import * as api from "../services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/api");

const mockUser = {
  login: "mockuser",
  name: "Mock User",
};

const mockRepos = [
  { id: 1, name: "repo1" },
  { id: 2, name: "repo2" },
];

const mockCommits = [
  { commit: { message: "Initial commit" } },
  { commit: { message: "Update README" } },
];

describe("UserProfile", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("displays repos after successful fetch", async () => {
    api.fetchRepos.mockResolvedValueOnce({ data: mockRepos });
    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );
    expect(await screen.findByText("repo1")).toBeInTheDocument();
    expect(screen.getByText("repo2")).toBeInTheDocument();
  });

  test("shows commits on repo click", async () => {
    api.fetchRepos.mockResolvedValueOnce({ data: mockRepos });
    api.fetchCommits.mockResolvedValueOnce({ data: mockCommits });

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    const repoItem = await screen.findByText("repo1");
    fireEvent.click(repoItem);

    await waitFor(() =>
      expect(screen.getByText("Initial commit")).toBeInTheDocument()
    );
    expect(screen.getByText("Update README")).toBeInTheDocument();
  });

  test("handles repo fetch error", async () => {
    api.fetchRepos.mockRejectedValueOnce(new Error("Network error"));
    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );
    expect(await screen.findByText("Failed to fetch repos")).toBeInTheDocument();
  });

  test("handles commit fetch error", async () => {
    api.fetchRepos.mockResolvedValueOnce({ data: mockRepos });
    api.fetchCommits.mockRejectedValueOnce(new Error("Commit error"));

    render(
      <MemoryRouter>
        <UserProfile user={mockUser} />
      </MemoryRouter>
    );

    const repoItem = await screen.findByText("repo1");
    fireEvent.click(repoItem);

    expect(await screen.findByText("Failed to fetch commits")).toBeInTheDocument();
  });
});
