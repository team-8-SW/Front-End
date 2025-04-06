import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";
import { BrowserRouter as Router } from "react-router-dom";

// Mock child components
jest.mock("../CreatePost", () => () => <div data-testid="create-post">CreatePost</div>);
jest.mock("../ProfileCard", () => () => <div data-testid="home-profile-card">ProfileCard</div>);
jest.mock("../Posts", () => () => <div data-testid="posts">Posts</div>);

describe("Home Component", () => {
  test("renders all child components correctly", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if child components are present
    expect(screen.getByTestId("create-post")).toBeInTheDocument();
    expect(screen.getByTestId("home-profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("posts")).toBeInTheDocument();
    
  });
});
