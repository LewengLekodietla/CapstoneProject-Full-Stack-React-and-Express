import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';

// Create the root React rendering target
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped in React.StrictMode for highlighting issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance (e.g. Web Vitals)
//reportWebVitals();