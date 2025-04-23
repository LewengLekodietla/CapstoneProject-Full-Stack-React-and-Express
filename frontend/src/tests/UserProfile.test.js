import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import * as api from '../services/api';

jest.mock('../services/api');

describe('UserProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays user data and repos with commits', async () => {
    const mockUser = {
      login: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
    };

    const mockRepos = [
      { id: 1, name: 'Repo1' },
      { id: 2, name: 'Repo2' },
    ];

    const mockCommits = [
      {
        sha: 'abc123',
        commit: { message: 'Initial commit', author: { name: 'Test Author' } },
      },
    ];

    api.fetchUser.mockResolvedValue(mockUser);
    api.fetchRepos.mockResolvedValue(mockRepos);
    api.fetchCommits.mockResolvedValue(mockCommits);

    render(
      <MemoryRouter initialEntries={['/user/testuser']}>
        <Routes>
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Test User')).toBeInTheDocument();
    expect(await screen.findByText('Repo1')).toBeInTheDocument();
    expect(await screen.findByText('Repo2')).toBeInTheDocument();

    const commitElements = await screen.findAllByText('Initial commit');
    expect(commitElements).toHaveLength(2); // One per repo
  });

  test('displays error message on API failure', async () => {
    api.fetchUser.mockRejectedValue(new Error('API failed'));
    api.fetchRepos.mockRejectedValue(new Error('API failed'));
    api.fetchCommits.mockRejectedValue(new Error('API failed'));

    render(
      <MemoryRouter initialEntries={['/user/testuser']}>
        <Routes>
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Something went wrong loading the profile.')
    ).toBeInTheDocument();
  });
});