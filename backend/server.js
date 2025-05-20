require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS to enable cross-origin requests
const helmet = require('helmet'); // Import Helmet for security enhancements
const routes = require("./routes"); // Import API routes

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 8080; // Define the PORT with a fallback

app.use(cors()); // Enable CORS for all requests
app.use(helmet()); // Secure the app by setting various HTTP headers
app.use(express.json()); // Enable parsing of JSON request bodies
app.use("/api", routes); // Use the defined API routes under "/api" prefix

// Only listen if not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Use export for ES Modules