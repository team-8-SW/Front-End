import React from "react";
import CreatePost from "./CreatePost";
import HomeProfileCard from "./HomeProfileCard";

const Home = () => {
  return (
    <div className="flex justify-center space-x-12 mr-4">
      <div className="w-1/5 ml-4">
        <HomeProfileCard />
      </div>
      <div className="w-3/5">
        <CreatePost />
      </div>
    </div>
  );
};

export default Home;
