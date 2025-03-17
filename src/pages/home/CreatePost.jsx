import React, { useState } from "react";
import { useProfilePicture, useUserId } from "../../services/api";
import PostModal from "./PostModal";
import PostBar from "./PostBar";

const CreatePost = () => {
  const userId = useUserId();
  console.log(userId);
  const photo = useProfilePicture(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <PostBar photo={photo} toggleModal={toggleModal} />
      <PostModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default CreatePost;
