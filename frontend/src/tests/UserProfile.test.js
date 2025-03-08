import { render, screen } from "@testing-library/react";
import UserProfile from "../pages/UserProfile";

//Mock user data for testing
const mockUser = {
    login: "octocat",
    name: "The Octocat",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    bio: "GitHub mascot",
    html_url: "https://github.com/octocat"
};

//Test case: Check if the user profile renders correctly
test("renders user profile", () => {
    render(<UserProfile user={mockUser} />); // Render the component with mock data
    expect(screen.getByText("The Octocat")).toBeInTheDocument(); // Check if name is displayed
    expect(screen.getByText("GitHub mascot")).toBeInTheDocument(); // Check if bio is displayed
});