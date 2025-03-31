import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@material-tailwind/react";
import PostBar from "../PostBar";
import{describe, test, expect,jest} from "@jest/globals";

describe("PostBar Component", () => {
  const mockPhoto = "https://example.com/photo.jpg";

  test("renders the start a post button", () => {
    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} />
      </ThemeProvider>
    );

    const startPostButton = screen.getByTestId("start-post-btn");
    expect(startPostButton).toBeInTheDocument();
  });

  test("calls toggleModal when the start a post button is clicked", () => {
    const mockToggleModal = jest.fn();

    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} toggleModal={mockToggleModal} />
      </ThemeProvider>
    );

    const startPostButton = screen.getByTestId("start-post-btn");
    fireEvent.click(startPostButton);

    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });

  test("renders the media, event, and write article buttons", () => {
    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} />
      </ThemeProvider>
    );

    expect(screen.getByText("Media")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Write article")).toBeInTheDocument();
  });
});
