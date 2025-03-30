import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../components/Search";
import { fetchUser } from "../services/api";

//Mock the fetchUser API
jest.mock("../services/api", () => ({
  __esModule: true,
  fetchUser: jest.fn(),
}));

//Scoped mock for useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ username: "test-user" }),
}));

describe("Search Component", () => {
  it("renders input and button", () => {
    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Enter GitHub username")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("shows loading state during search", async () => {
    fetchUser.mockResolvedValueOnce({ login: "mockUser" });

    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "mockUser" },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("Searching...")).toBeInTheDocument();
  });

  it("navigates to profile on successful search", async () => {
    fetchUser.mockResolvedValueOnce({ login: "mockUser" });

    const setUser = jest.fn();

    render(
      <MemoryRouter>
        <Search onUserFound={setUser} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "mockUser" },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("Searching...")).toBeInTheDocument();
    expect(fetchUser).toHaveBeenCalledWith("mockUser");
    expect(mockNavigate).toHaveBeenCalledWith("/profile/mockUser");
  });

  it("shows error on failed search (user not found)", async () => {
    // Simulate 404 response
    fetchUser.mockRejectedValueOnce({
      response: { status: 404 },
    });

    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "invalidUser" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Use flexible content matcher to avoid rendering issues
    expect(
      await screen.findByText((text) =>
        text.toLowerCase().includes("user not found")
      )
    ).toBeInTheDocument();
  });

  it("shows error for invalid username format", () => {
    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "invalid user$%" },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(
      screen.getByText("Invalid GitHub username format.")
    ).toBeInTheDocument();
  });

  it("shows error if input is empty", () => {
    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Search"));

    expect(
      screen.getByText("Please enter a GitHub username")
    ).toBeInTheDocument();
  });
});
