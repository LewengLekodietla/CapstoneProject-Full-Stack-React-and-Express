import React from 'react';
import { useState, useEffect } from "react";
import { fetchRepos, fetchCommits } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const [repos, setRepos] = useState([]); // Stores repositories
  const [commits, setCommits] = useState([]); // Stores commit history
  const [selectedRepo, setSelectedRepo] = useState(null); // Tracks selected repo
  const [loadingRepos, setLoadingRepos] = useState(false); // Loading state for repositories
  const [loadingCommits, setLoadingCommits] = useState(false); // Loading state for commits
  const [error, setError] = useState(null); // Stores error messages
  const navigate = useNavigate();

  //Delayed redirect if no user is found
  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);// Delay of 3 seconds before redirecting
      return;
  }

  setLoadingRepos(true);
    fetchRepos(user.login)
      .then((data) => setRepos(data))
      .catch(() => setError("Failed to fetch repositories."))
      .finally(() => setLoadingRepos(false));
  }, [user, navigate]);

  //Fetch commits with better error handling
  const loadCommits = (repoName) => {
    setLoadingCommits(true);
    setSelectedRepo(repoName);
    fetchCommits(user.login, repoName)
      .then((data) => {
        setCommits(data);
        setError(null);
      })
      .catch((err) => {
        setError(`Failed to fetch commits for ${repoName}. Please try again.`);
      })
      .finally(() => setLoadingCommits(false));
  };

  //Prevent unnecessary rendering when user is missing
  if (!user) return <p>No user selected. Redirecting...</p>;

  return (
    <div>
      <h2>{user.name || user.login}</h2>
      <img src={user.avatar_url} alt="avatar" width={100} />
      <p>{user.bio || "No bio available"}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>
        Visit GitHub Profile
      </a>

      <h3>Repositories</h3>
      {loadingRepos ? <p>Loading...</p> : repos.length === 0 ? <p>No repositories found.</p> : (
        <ul>
          {repos.slice(0, 5).map((repo) => (
            <li key={repo.id}>
              <strong>{repo.name}</strong> - {repo.description || "No description"}
              <button onClick={() => loadCommits(repo.name)} disabled={loadingCommits}>
                {loadingCommits && selectedRepo === repo.name ? "Loading..." : "View Commits"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {commits.length > 0 && selectedRepo && (
        <div>
          <h4>Last 5 Commits in {selectedRepo}</h4>
          <ul>
            {commits.map((c, i) => (
              <li key={i}>
                <strong>{new Date(c.date).toLocaleString()}</strong>: {c.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserProfile;