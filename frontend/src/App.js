import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Search from "./components/Search";
import UserProfile from "./pages/UserProfile";

function App() {
    const [user, setUser] = useState(null); //Store user data globally
    return (
        <Router>
            <Routes>
                {/* Pass setUser function to update user state when searching */}
                <Route path="/" element={<Search onUserFound={setUser} /> } />
                {/* Pass user data as a prop to UserProfile */}
                <Route path="/user" element={<UserProfile user={user} />} />
            </Routes>
        </Router>
    );
}

export default App;