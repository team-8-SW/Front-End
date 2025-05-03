
import React,{ useState} from "react";
import CreatePost from "./Posts/CreatePost";
import ProfileCard from "./ProfileCard";
import Posts from "./Posts/Posts";
import Nav from "../../components/Nav";
import MyCompanies from "./MyCompanies";

const Home = ({ loggedUser, searching }) => {
  

  return (
    <div>
      <div className="flex justify-center space-x-12 mr-4">
        <div className="w-1/5 ml-4 mt-4">
          <ProfileCard loggedUser={loggedUser} />
          <MyCompanies />
        </div>
        <div className="w-3/5">
          <CreatePost loggedUser={loggedUser} />
          <div className="mt-4">
            <Posts
              loggedUser={loggedUser}
              searching={searching}
            />
          </div>
        </div>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default Home;