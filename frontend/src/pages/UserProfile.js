
import React, { useEffect, useState } from "react";
import { fetchRepos, fetchCommits } from "../services/api";

const UserProfile = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchRepos(user.login);
        setRepos(response.data);
      } catch (err) {
        setError("Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    };

    if (user?.login) {
      loadRepos();
    }
  }, [user]);

  const handleRepoClick = async (repoName) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchCommits(user.login, repoName);
      setCommits(response.data.slice(0, 5));
    } catch (err) {
      setError("Failed to fetch commits");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{user.name || user.login}'s Repositories</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} onClick={() => handleRepoClick(repo.name)}>
            {repo.name}
          </li>
        ))}
      </ul>
      {commits.length > 0 && (
        <div>
          <h3>Last 5 Commits</h3>
          <ul>
            {commits.map((commit, index) => (
              <li key={index}>{commit.commit.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
