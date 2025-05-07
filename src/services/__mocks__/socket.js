const mockSocket = {
  connected: true,
  emit: jest.fn(),
  on: jest.fn((event, callback) => {
    // Auto-trigger some events
    if (event === 'connect') callback();
  }),
  off: jest.fn(),
  disconnect: jest.fn(),
  connect: jest.fn(),
  io: {
    connect: jest.fn()
  }
};

export default mockSocket;