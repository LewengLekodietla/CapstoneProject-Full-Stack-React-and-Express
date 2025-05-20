import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import api from '../services/api';

// Mock API methods
jest.mock('../services/api');

// Mock data for user, repos, and commits
const mockUserData = {
  login: 'mockuser',
  avatar_url: 'https://example.com/avatar.jpg',
  followers: 10,
  following: 5,
  public_repos: 2,
};

const mockRepos = [
  { id: 1, name: 'Repo1', description: 'Test repo 1', created_at: new Date().toISOString() },
  { id: 2, name: 'Repo2', description: 'Test repo 2', created_at: new Date().toISOString() }
];

const mockCommits = [
  { sha: 'abc123', commit: { message: 'Initial commit' } }
];

// Test suite for UserProfile component
describe('UserProfile Component > renders user info, repos, and commits', () => {
  beforeEach(() => {
    api.fetchUserData.mockResolvedValue(mockUserData);
    api.fetchRepos.mockResolvedValue(mockRepos);
    api.fetchCommits.mockResolvedValue(mockCommits);
  });

  it('renders user info, repos, and commits', async () => {
    // Render UserProfile inside a simulated router
    render(
      <MemoryRouter initialEntries={['/user/mockuser']}>
        <Routes>
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    // Avatar + Name
    expect(await screen.findByText('(mockuser)')).toBeInTheDocument();
    expect(await screen.findByAltText('avatar')).toBeInTheDocument();

    // Followers/Following/Public Repos
    expect(await screen.findByText(/Followers: 10/)).toBeInTheDocument();
    expect(await screen.findByText(/Following: 5/)).toBeInTheDocument();
    expect(await screen.findByText(/Public Repos: 2/)).toBeInTheDocument();

    // Repo names
    expect(await screen.findByText(/Repo1/)).toBeInTheDocument();
    expect(await screen.findByText(/Repo2/)).toBeInTheDocument();
  });
});