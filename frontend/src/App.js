import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search.js';
import UserProfile from './pages/UserProfile.js';

// Top-level component that sets up routing for the app
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;