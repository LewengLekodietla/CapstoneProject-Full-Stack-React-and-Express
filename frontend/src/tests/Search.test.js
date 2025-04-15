import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../components/Search";
import { fetchUser } from "../services/api";

// Mock fetchUser from the services/api module
jest.mock("../services/api", () => ({
  fetchUser: jest.fn(),
}));

// Mock navigate from react-router-dom
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter GitHub username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("navigates to profile on successful search", async () => {
    fetchUser.mockResolvedValueOnce({ login: "mockUser" });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "mockUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalledWith("mockUser");
      expect(mockNavigate).toHaveBeenCalledWith("/profile/mockUser");
    });
  });

  it("shows error message when user is not found (404)", async () => {
    fetchUser.mockRejectedValueOnce({ response: { status: 404 } });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "unknownUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
  });

  it("shows generic error for other errors", async () => {
    fetchUser.mockRejectedValueOnce(new Error("Internal Server Error"));

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username"), {
      target: { value: "someUser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      await screen.findByText(/an error occurred\. please try again later\./i)
    ).toBeInTheDocument();
  });
});