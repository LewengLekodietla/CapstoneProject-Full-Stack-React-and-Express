import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from '../../pages/UserProfile';

// Snapshot test for UserProfile component to catch UI regressions
it('matches snapshot', () => {
  const tree = renderer.create(
    <BrowserRouter>
      <UserProfile />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});