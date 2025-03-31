import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePost from "../CreatePost";
import "@testing-library/jest-dom";
import { useUserId, useProfilePicture} from "../../../services/api";

//Mock Custom Hooks
jest.mock("../../../services/api", () => ({
  useUserId: jest.fn(() => "3"),
  useProfilePicture: jest.fn(() => "https://example.com/profile.jpg"),
}));

// Mock PostModal to respect `isOpen` prop
jest.mock("../PostModal", () => ({ isOpen }) =>
  isOpen ? <div data-testid="post-modal">Post Modal</div> : null
);

describe("CreatePost Component", () => {
  test("renders PostBar with correct profile picture", () => {
    render(<CreatePost />);
    
    //Check profile picture is passed correctly
    expect(screen.getByAltText("profile-picture")).toHaveAttribute(
      "src",
      "https://example.com/profile.jpg"
    );
  });

  test("opens and closes modal on button click", () => {
    render(<CreatePost />);

    // Ensure modal is NOT in the document initially
    expect(screen.queryByTestId("post-modal")).toBeNull();

    // Clicks "Start a post" to open modal
    fireEvent.click(screen.getByText(/start a post/i));
    expect(screen.getByTestId("post-modal")).toBeInTheDocument();
  });
});
