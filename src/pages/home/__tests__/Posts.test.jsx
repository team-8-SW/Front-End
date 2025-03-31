import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Posts from "../Posts";
import "@testing-library/jest-dom";

// ✅ Properly Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn(() => {
    // ✅ Immediately trigger the callback when observe() is called
    this.callback([{ isIntersecting: true }]);
  });
  disconnect = jest.fn();
};

// ✅ Mock API functions
jest.mock("../../../services/api", () => ({
  fetchPosts: jest.fn((page) =>
    Promise.resolve(
      page === 1
        ? [
            { id: "1", authorId: "101", authorName: "User 1", content: "First post", comments: [] },
            { id: "2", authorId: "102", authorName: "User 2", content: "Second post", comments: [] },
          ]
        : [
            { id: "3", authorId: "103", authorName: "User 3", content: "Third post", comments: [] },
            
          ]
    )
  ),
  useUserId: jest.fn(() => "999"),
  useProfilePicture: jest.fn((userId) => `https://example.com/profile-${userId}.jpg`),
  useName: jest.fn((userId) => (userId === "999" ? "Logged-in User" : `User ${userId}`)),
}));

describe("Posts Component", () => {
  test("renders initial posts", async () => {
    render(<Posts />);

    // ✅ Wait for initial posts to load
    await waitFor(() => expect(screen.getByText("First post")).toBeInTheDocument());
    expect(screen.getByText("Second post")).toBeInTheDocument();
  });

  test("loads more posts on scroll", async () => {
    render(<Posts />);

    // ✅ Wait for initial posts
    await waitFor(() => expect(screen.getByText("First post")).toBeInTheDocument());

    // ✅ Simulate IntersectionObserver triggering scroll
    act(() => {
      new IntersectionObserver(() => {}).observe();
    });

    // ✅ Wait for new posts to appear
    await waitFor(() => expect(screen.getByText("Third post")).toBeInTheDocument());
  });
});
