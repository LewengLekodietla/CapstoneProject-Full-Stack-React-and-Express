import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Search from '../../components/Search';

// Snapshot test for Search component to ensure consistent UI rendering
it('matches snapshot', () => {
  const tree = renderer.create(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});