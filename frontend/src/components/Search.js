import { useState } from "react";
import { fetchUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Search = ({ onUserFound }) => {
    const [username, setUsername] = useState(""); // Stores input username
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Stores error messages
    const navigate = useNavigate(); //Use React Router for navigation


    //Handle search function
    const handleSearch = async () => {
        if (!username.trim()) {
            setError("Please enter a GitHub username");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await fetchUser(username);
            onUserFound(data); // Store user data in App state
            navigate("/user"); // Redirect to profile page
        } catch (err) {
            setError("User not found");
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Search GitHub User</h2>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Search;