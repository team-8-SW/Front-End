import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import PostBar from "../PostBar";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest"; // Ensure matchers like toBeInTheDocument() work

describe("PostBar Component", () => {
  const mockPhoto = "https://example.com/photo.jpg";

  test("renders the start a post button", () => {
    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} />
      </ThemeProvider>
    );

    // Use getAllByRole and pick the correct button
    const startPostButtons = screen.getAllByRole("button", { name: /start a post/i });
    expect(startPostButtons[0]).toBeInTheDocument();
  });

  test("calls toggleModal when the start a post button is clicked", () => {
    const mockToggleModal = vi.fn(() => {
      console.log("toggleModal called"); // Debugging line
    });
  
    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} toggleModal={mockToggleModal} />
      </ThemeProvider>
    );
  
    // Debugging: Log the rendered component
    console.log(screen.debug());
  
    // Use getAllByTestId and select the first button
    const startPostButtons = screen.getAllByTestId("start-post-btn");
    console.log(startPostButtons); // Debugging line
  
    // Manually trigger the onClick handler
    startPostButtons[0].onClick();
  
    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });

  test("renders the media, event, and write article buttons", () => {
    render(
      <ThemeProvider>
        <PostBar photo={mockPhoto} />
      </ThemeProvider>
    );

    // Select buttons using getAllByRole and choose specific ones
    const mediaButtons = screen.getAllByRole("button", { name: /media/i });
    const eventButtons = screen.getAllByRole("button", { name: /event/i });
    const writeArticleButtons = screen.getAllByRole("button", { name: /write article/i });

    expect(mediaButtons[0]).toBeInTheDocument();
    expect(eventButtons[0]).toBeInTheDocument();
    expect(writeArticleButtons[0]).toBeInTheDocument();
  });
});