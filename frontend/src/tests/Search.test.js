import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../services/api'; // Import all API functions
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('Search Component', () => {
  test('renders input and button', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/enter github username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('calls fetchUser and navigates on submit', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const mockUser = { login: 'mockuser' };
    jest.spyOn(api, 'fetchUser').mockResolvedValue(mockUser);

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/enter github username/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'mockuser' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.fetchUser).toHaveBeenCalledWith('mockuser');
      expect(mockNavigate).toHaveBeenCalledWith('/user/mockuser');
    });
  });
});