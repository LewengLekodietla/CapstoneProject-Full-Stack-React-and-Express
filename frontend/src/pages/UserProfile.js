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

    //Redirect to search if no user is found
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    //Fetch repositories when the user is set
    useEffect(() => {
        if (user) {
            setLoadingRepos(true);
            fetchRepos(user.login)
                .then(({ data }) => {
                    setRepos(data);
                    setError(null);
                })
                .catch(() => setError("Failed to fetch repositories"))
                .finally(() => setLoadingRepos(false));
        }
    }, [user]);

    //Fetch commits when a repository is clicked
    const loadCommits = (repoName) => {
        setLoadingCommits(true);
        setSelectedRepo(repoName);
        fetchCommits(user.login, repoName)
            .then(({ data }) => {
                setCommits(data);
                setError(null);
            })
            .catch(() => setError("Failed to fetch commits"))
            .finally(() => setLoadingCommits(false));
    };

    //Handle case where no user is selected
    if (!user) return <p>No user selected.</p>;

    return (
        <div>
            <h2>{user.name || user.login}</h2>
            <img src={user.avatar_url} alt={user.name} width={100} />
            <p>{user.bio || "No bio available"}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                Visit GitHub Profile
            </a>

            <h3>Repositories:</h3>
            {loadingRepos ? <p>Loading repositories...</p> : null}
            {error && <p style={{ color: "red" }}>{error}</p>}
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

            {commits.length > 0 && selectedRepo && (
                <div>
                    <h3>Last 5 Commits in {selectedRepo}:</h3>
                    <ul>
                        {commits.map((commit, index) => (
                            <li key={index}>
                                <strong>{commit.date}</strong>: {commit.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfile;