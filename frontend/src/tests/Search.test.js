import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../components/Search";
import api from "../services/api";

// Mock the API module to isolate tests from real HTTP requests
jest.mock("../services/api");

// Test suite for the Search component
describe("Search Component", () => {
  test("renders input and submits search", async () => {
    // Set up mock API response
    api.fetchUserData.mockResolvedValue({ login: "testuser" });

    // Render Search inside a memory-based router context
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    // Simulate user typing and submitting the form
    const input = screen.getByPlaceholderText(/Enter Github username/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.submit(screen.getByRole("button"));

    // Check if fetchUserData was called with the correct username
    expect(api.fetchUserData).toHaveBeenCalledWith("testuser");
  });
});
