import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const Search = () => {
  // Local state to capture the user's input
  const [username, setUsername] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();

  // Handle form submission to search for a GitHub user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior (page reload)
    if (username.trim()) {
      try {
        const user = await api.fetchUserData(username); // Fetch the user using the inputted username
        console.log("User fetched:", user); // Optional debug log
        navigate(`/user/${username}`);
      } catch (error) {
        console.error(error); // Log error if user not found or fetch fails
      }
    }
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Github username"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;