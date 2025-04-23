import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/api';

function Search() {
  // Local state to capture the user's input
  const [username, setUsername] = useState('');
  
  // React Router hook for navigation
  const navigate = useNavigate();

  // Handle form submission to search for a GitHub user
  const handleSubmit = async (e) => {
    e.preventDefault();// Prevent default form behavior (page reload)
    try {
      const user = await fetchUser(username); // Fetch the user using the inputted username
      navigate(`/user/${user.login}`); // Navigate to the user's profile page
    } catch (error) {
      console.error(error); // Log error if user not found or fetch fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Github username"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;