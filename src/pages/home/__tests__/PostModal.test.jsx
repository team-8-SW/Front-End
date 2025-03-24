import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostModal from "../PostModal";
import "@testing-library/jest-dom";
import axios from "axios";

//Mock API Calls
jest.mock("axios");

describe("PostModal Component", () => {
  const toggleModal = jest.fn();

  test("does not render when isOpen is false", () => {
    render(<PostModal isOpen={false} toggleModal={toggleModal} />);
    expect(screen.queryByText("Create a Post")).not.toBeInTheDocument();
  });

  test("renders correctly when isOpen is true", () => {
    render(<PostModal isOpen={true} toggleModal={toggleModal} />);
    expect(screen.getByText("Create a Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument();
  });

  test("validates empty post content", async () => {
    render(<PostModal isOpen={true} toggleModal={toggleModal} />);

    fireEvent.click(screen.getByText("Post"));

    expect(await screen.findByText("Post content cannot be empty.")).toBeInTheDocument();
  });

  test("handles posting successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { id: "1" } });

    render(<PostModal isOpen={true} toggleModal={toggleModal} />);
    fireEvent.change(screen.getByPlaceholderText("What's on your mind?"), { target: { value: "Hello, World!" } });

    fireEvent.click(screen.getByText("Post"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/posts", expect.any(Object));
      expect(toggleModal).toHaveBeenCalled();
    });
  });

  test("closes modal when clicking cancel", () => {
    render(<PostModal isOpen={true} toggleModal={toggleModal} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    
    expect(toggleModal).toHaveBeenCalled();
  });

  test("closes modal when clicking outside", () => {
    render(<PostModal isOpen={true} toggleModal={toggleModal} />);

    fireEvent.click(screen.getByTestId("modal-overlay"));

    expect(toggleModal).toHaveBeenCalled();
  });
});
