// setupTests.js
import "@testing-library/jest-dom";

import "mutationobserver-shim";

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

//Mock react-router-dom globally
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ username: "test-user" }),
}));

//Fix MutationObserver error
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
};
