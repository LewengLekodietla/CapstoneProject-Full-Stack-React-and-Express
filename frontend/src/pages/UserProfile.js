import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData, fetchRepos, fetchCommits } from "../services/api.js";

const UserProfile = () => {
  // Extract the GitHub username from the URL parameter
  const { username } = useParams();

  // State to store user data, repositories, and commits
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCommits, setLoadingCommits] = useState(false);

  // Fetch user and repository data when component mounts or username changes
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await fetchUserData(username);
        const repoData = await fetchRepos(username);
        setUser(userData);
        setRepos(repoData);
        setError("");
      } catch (err) {
        setError("Failed to load user or repositories.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Fetch the last 5 commits when a repository is selected
  const handleLoadCommits = async (repoName) => {
    setLoadingCommits(true);
    setSelectedRepo(repoName);
    try {
      const commitData = await fetchCommits(username, repoName);
      setCommits(commitData);
    } catch (err) {
      setError(`Failed to load commits for ${repoName}`);
    } finally {
      setLoadingCommits(false);
    }
  };

  if (loading) return React.createElement("p", null, "Loading...");
  if (error)
    return React.createElement("p", { style: { color: "red" } }, error);
  if (!user) return React.createElement("p", null, "No user found.");

  return (
    <div>
      <h2>
        {user.name} ({user.login})
      </h2>
      <img src={user.avatar_url} alt="avatar" width="100" />
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>

      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> — {repo.description}
            <br />
            Created: {new Date(repo.created_at).toLocaleDateString()}
            <br />
            <button onClick={() => handleLoadCommits(repo.name)}>
              View Last 5 Commits
            </button>
          </li>
        ))}
      </ul>

      {loadingCommits && <p>Loading commits...</p>}

      {selectedRepo && commits.length > 0 && (
        <div>
          <h4>Last 5 commits for {selectedRepo}</h4>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>{commit.commit.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
