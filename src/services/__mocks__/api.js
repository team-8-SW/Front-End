export const searchUsers = jest.fn(() => Promise.resolve({ users: [] }));
export const getConnections = jest.fn(() => Promise.resolve([]));

// Mock other API functions as needed
export default {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};