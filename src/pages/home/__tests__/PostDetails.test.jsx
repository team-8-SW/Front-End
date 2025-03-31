import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostDetails from "../PostDetails";
import "@testing-library/jest-dom";

//  Mock custom hooks and API functions
jest.mock("../../../services/api", () => ({
  useProfilePicture: jest.fn(() => "https://example.com/profile.jpg"),
  useUserId: jest.fn(() => "123"),
  useName: jest.fn(() => "Test User"),
  handleLikePost: jest.fn(),
  handlerepostPost: jest.fn(),
  handleAddNewComment: jest.fn((postId, comment, userId, commenterName, comments, setComments, setNewComment) => {
    setComments([...comments, { id: comments.length + 1, authorName: commenterName, content: comment }]);
    setNewComment("");
  }),
  handleLoadMoreComments: jest.fn((setVisibleComments) => {
    setVisibleComments((prev) => prev + 2);
  }),
}));

const mockPost = {
  id: "1",
  authorId: "999",
  authorName: "John Doe",
  content: "This is a test post",
  likes: [],
  comments: [
    { id: "1", authorName: "Alice", content: "First comment" },
    { id: "2", authorName: "Bob", content: "Second comment" },
  ],
  reposts: [],
};

describe("PostDetails Component", () => {
  test("allows liking a post", () => {
    render(<PostDetails post={mockPost} />);
    
    //  Click the like icon
    fireEvent.click(screen.getByTestId("like-icon"));

    //  Ensure API function was called
    expect(require("../../../services/api").handleLikePost).toHaveBeenCalled();
  });

  test("allows reposting a post", () => {
    render(<PostDetails post={mockPost} />);

    //  Click the repost icon
    fireEvent.click(screen.getByTestId("repost-icon"));

    //  Ensure API function was called
    expect(require("../../../services/api").handlerepostPost).toHaveBeenCalled();
  });

  test("allows opening and closing the comment section", () => {
    render(<PostDetails post={mockPost} />);

    //  Open comment section
    fireEvent.click(screen.getByTestId("comment-icon"));
    expect(screen.getByText("First comment")).toBeInTheDocument();

    //  Close comment section
    fireEvent.click(screen.getByTestId("comment-icon"));
    expect(screen.queryByText("First comment")).not.toBeInTheDocument();
  });

  test("allows adding a new comment", async () => {
    render(<PostDetails post={mockPost} />);

    //  Open the comment section first
    fireEvent.click(screen.getByTestId("comment-icon"));

    //  Wait for the comment input field to appear
    await waitFor(() => screen.getByPlaceholderText("Write a comment..."));

    const commentInput = screen.getByPlaceholderText("Write a comment...");
    const postButton = screen.getByTestId("post-comment-btn");

    //  Type a new comment
    fireEvent.change(commentInput, { target: { value: "New test comment" } });

    //  Submit the comment
    fireEvent.click(postButton);

    //  Wait for the Load More button to appear
    await waitFor(() => screen.getByTestId("load-more-comments-btn"));

    //  Click the Load More button
    fireEvent.click(screen.getByTestId("load-more-comments-btn"));

    // Ensure API function was called
    expect(require("../../../services/api").handleLoadMoreComments).toHaveBeenCalled();
    expect(await screen.findByText("New test comment")).toBeInTheDocument();
  });
});
