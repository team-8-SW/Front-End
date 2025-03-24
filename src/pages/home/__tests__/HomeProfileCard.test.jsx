import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomeProfileCard from "../HomeProfileCard";
import "@testing-library/jest-dom";
import * as api from "../../../services/api"; // Import everything as api

jest.mock("../../../services/api");

// Mock Custom Hooks
api.useUserId.mockReturnValue("3");
api.useProfilePicture.mockReturnValue(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s"
);
api.useCoverPhoto.mockReturnValue(
  "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862"
);
api.useName.mockReturnValue("Mark Maged");
api.useUserData.mockReturnValue({
  education: [{ school: "Helwan University", degree: "Bachelor" }],
  location: { city: "Cairo", country: "Egypt" },
});

describe("HomeProfileCard Component", () => {
  test("renders user profile information correctly", async () => {
    render(
      <Router>
        <HomeProfileCard />
      </Router>
    );

    

    // Check profile picture and cover photo
    expect(screen.getByAltText("profile-picture")).toHaveAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s"
    );
    expect(screen.getByAltText("cover-photo")).toHaveAttribute(
      "src",
      "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862"
    );

    // Check name,education and location
    expect(screen.getByText("Mark Maged")).toBeInTheDocument();
    expect(screen.getByText("Helwan University")).toBeInTheDocument();
    expect(screen.getByText("Cairo, Egypt")).toBeInTheDocument();
    expect(screen.getByText("Bachelor")).toBeInTheDocument();
  });
});
