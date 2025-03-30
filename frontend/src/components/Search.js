import React from 'react';
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
    setError(null); //Clear previous errors

    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }
    //Ensure username follows GitHub username rules (no spaces, special characters except `-`)
    if (!/^[a-zA-Z0-9-]+$/.test(username.trim())) {
      setError("Invalid GitHub username format.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchUser(username);
      onUserFound(data); // Store user data in App state
      navigate(`/profile/${username}`); // Redirect to profile page
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found."); // Improved Error Handling
      } else {
        setError("An error occurred. Please try again later."); //General API Error Handling
      }
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
        aria-label="GitHub Username Input"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Search;
