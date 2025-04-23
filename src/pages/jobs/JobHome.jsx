// pages/Home.jsx
import React from "react";

import TopProfileCard from "./TopProfileCard";
import RecommendedJobsCard from "./RecommendedJobsCard";
import LeftSideHome from "./LeftSideHome";



const Home = () => {
  return (
    <div className="flex bg-[#f3f2ef] p-4 gap-12 justify-center w-full">
      {/* LEFT */}
      <div className="w-1/4">
        <TopProfileCard />
        <div className="mt-4">
          <LeftSideHome />
        </div>
      </div>

      {/* CENTER */}
      <div className=" w-1/2" >
        <RecommendedJobsCard />
      </div>
    </div>
  );
};

export default Home;
