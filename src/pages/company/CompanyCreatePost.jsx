import React, { useState } from "react";
import CompanyPostModal from "./CompanyPostModal";
import CompanyPostBar from "./CompanyPostBar";
//import { useProfilePicture } from "../../services/api";

const CompanyCreatePost = ({ companyId, companyName,setPosts, companyLogo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const profilePhoto = useProfilePicture(companyId);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <CompanyPostBar photo={companyLogo} toggleModal={toggleModal} />
      <CompanyPostModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        companyId={companyId}
        companyName={companyName} // ✅ passing the correct name
        setPosts={setPosts}
      />
    </div>
  );
};

export default CompanyCreatePost;