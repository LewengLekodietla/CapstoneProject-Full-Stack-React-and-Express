import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../components/Search";
import axios from "axios";

jest.mock("axios");

// Mock useNavigate and simulate routing behavior
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Search Component", () => {
  // Suppress console.error messages during tests
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // Restore console and mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Enter GitHub username")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("navigates to profile on successful search", async () => {
    const mockUser = { login: "mockUser" };
    axios.get.mockResolvedValueOnce({ data: mockUser });

    const onUserFound = jest.fn();

    render(
      <MemoryRouter>
        <Search onUserFound={onUserFound} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "mockUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(onUserFound).toHaveBeenCalledWith(mockUser);
      expect(mockNavigate).toHaveBeenCalledWith("/profile/mockUser");
    });
  });

  it("shows error on failed search (user not found)", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "unknownUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
  });
  it("shows generic error on other failures", async () => {
    axios.get.mockRejectedValueOnce(new Error("Server error"));

    render(
      <MemoryRouter>
        <Search onUserFound={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "testUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText(/an error occurred/i)).toBeInTheDocument();
  });
});
