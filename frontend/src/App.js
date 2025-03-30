import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import UserProfile from "./pages/UserProfile";

function App() {
  // Load user from localStorage or set to null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to localStorage whenever it updates
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {/*Update user state when searching */}
        <Route path="/" element={<Search onUserFound={setUser} />} />

        {/*Updated: Use username in the URL */}
        <Route path="/profile/:username" element={<UserProfileWrapper user={user} />} />

        {/*Handle unknown routes (404 page) */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

//Wrapper component to get the username from URL
function UserProfileWrapper({ user }) {
  const { username } = useParams();

  if (!user || user.login !== username) {
    return <Navigate to="/" replace />;
  }

  return <UserProfile user={user} />;
}

export default App;