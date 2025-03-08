import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../components/Search";

//Test case: Check if the search input and button are rendered
test("renders search box and button", () => {
    render(<Search onUserFound={() => {}} />); // Render the Search component
    expect(screen.getByPlaceholderText("Enter GitHub username")).toBeInTheDocument(); // Check input field
    expect(screen.getByText("Search")).toBeInTheDocument(); // Check button
});

//Test case: Check if the loading text appears when searching
test("shows loading text when searching", async () => {
    render(<Search onUserFound={() => {}} />); // Render the Search component
    fireEvent.click(screen.getByText("Search")); // Simulate clicking the search button
    expect(screen.getByText("Searching...")).toBeInTheDocument(); // Check if loading text appears
});