import React, { useState } from "react";
import { useProfilePicture } from "../../../services/api";
import PostModal from "./PostModal";
import PostBar from "./PostBar";


const CreatePost = ({loggedUser}) => {
  const photo = useProfilePicture(loggedUser.id);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  return (
    <div>
      <PostBar
        photo={photo}
        togglePostModal={togglePostModal}
        className="w-12 h-12 rounded-full"
      />
      <PostModal isOpen={isPostModalOpen} toggleModal={togglePostModal} loggedUser={loggedUser} />
    </div>
  );
};

export default CreatePost;
