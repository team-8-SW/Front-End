import React, { useState } from "react";
import { useProfilePicture } from "../../../services/api";
import PostModal from "./PostModal";
import PostBar from "./PostBar";

const CreatePost = ({loggedUser}) => {
  if (!loggedUser) {
    return <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse"></div>;
  }

  const photo = useProfilePicture(loggedUser.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <PostBar
        photo={photo}
        toggleModal={toggleModal}
        className="w-12 h-12 rounded-full"
      />
      <PostModal isOpen={isModalOpen} toggleModal={toggleModal} loggedUser={loggedUser} />
    </div>
  );
};

export default CreatePost;
