import React from "react";
import CreatePost from "./Posts/CreatePost";
import HomeProfileCard from "./HomeProfileCard";
import Posts from "./Posts/Posts";

const Home = () => {
  return (
  <div>
    <div className="flex justify-center space-x-12 mr-4">
      <div className="w-1/5 ml-4 mt-4">
        <HomeProfileCard />
      </div>
      <div className="w-3/5">
        <CreatePost />
        <div className="mt-4">
          <Posts />
        </div>
      </div>
      <div className="w-1/5"></div>
    </div>
  </div>
  );
};

export default Home;
