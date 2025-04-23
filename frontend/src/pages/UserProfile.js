import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, fetchRepos, fetchCommits } from '../services/api';

function UserProfile() {
  // Get the dynamic username from the route parameter
  const { username } = useParams();

  // Local state to store user data, repositories, commits, and potential errors
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState({});
  const [error, setError] = useState("");

  // Fetch user details, repositories, and their latest commits on component mount or when the username changes
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch user profile information
        const userData = await fetchUser(username);
        setUser(userData);

        // Fetch repositories associated with the user
        const repoData = await fetchRepos(username);
        setRepos(repoData);

        // For each repository, fetch its commit data and build a mapping
        const commitData = {};
        for (const repo of repoData) {
          const commits = await fetchCommits(username, repo.name);
          commitData[repo.name] = commits;
        }

        setCommits(commitData);
      } catch (err) {
        setError("Something went wrong loading the profile.");
      }
    };

    loadData();// Trigger the async data loading
  }, [username]);

  // Handle loading or error states before rendering the profile content
  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h1>{user.name || user.login}</h1>
      <img src={user.avatar_url} alt={`${user.login} avatar`} width="100" />

      <h2>Repositories</h2>
      {repos.map((repo) => (
        <div key={repo.id} style={{ marginBottom: "1rem" }}>
          <strong>{repo.name}</strong>
          <ul>
            {commits[repo.name]?.map((commit, index) => (
              <li key={index}>
                <span>{commit.commit.message}</span> by <em>{commit.commit.author.name}</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;