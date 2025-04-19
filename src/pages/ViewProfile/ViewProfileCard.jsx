import React, { useState } from "react";
import {
  Card, CardHeader, CardBody, CardFooter, Typography, Button, Avatar
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import ViewContactInfo from "./ViewContactInfo";
import ConnectButton from "../network/ConnectButton";
import AcceptConnection from "../network/AcceptConnection";
import DeclineConnection from "../network/DeclineConnection";
import { removeConnection, blockUser, unblockUser, followUser, unfollowUser } from "../../services/api";

const ViewProfileCard = ({ profile, userid, token, connectionStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [isBlocked, setIsBlocked] = useState(profile?.isBlocked || false);
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing || false);
  const [isLoading, setIsLoading] = useState(false);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  const toggleDropdown = () => setIsOpen(!isOpen);
  const connectionId = profile?.connectionId;

  const handleRemoveConnection = async () => {
    try {
      const data = await removeConnection(profile.user_id);
      console.log("Connection removed:", data);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  const handleBlockAction = async () => {
    try {
      if (isBlocked) {
        await unblockUser(userid, token);
        setIsBlocked(false);
        alert('User unblocked successfully');
      } else {
        await blockUser(userid, token);
        setIsBlocked(true);
        alert('User blocked successfully');
      }
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${isBlocked ? 'unblock' : 'block'} user`);
    }
  };
  

  const handleFollowWithoutConnecting = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(userid, token);
        setIsFollowing(false);
      } else {
        const response = await followUser(userid, token);
        if (response.message === "User followed successfully") {
          setIsFollowing(true);
        }
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      alert(
        error.response?.data?.message || 
        error.message || 
        `Failed to ${isFollowing ? 'unfollow' : 'follow'} user`
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleFollow = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
  
      if (isFollowing) {
        const response = await axios.delete(
          `http://localhost:5000/api/following/users/${userId}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        if (response.status === 200) {
          setIsFollowing(false);
        }
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/following/users/${userId}`,
          {},
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (response.data.message === "User followed successfully") {
          setIsFollowing(true);
        }
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || 
        err.message || 
        `Failed to ${isFollowing ? 'unfollow' : 'follow'} user`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="relative w-full mx-auto shadow-lg rounded-lg">
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src={profile.coverPhotoUrl || "/default-cover.jpg"}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </CardHeader>

      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src={profile.profilePictureUrl || "/default-avatar.png"}
          size="xxl"
          className="border-4 border-white shadow-lg"
        />
      </div>

      <CardBody className="pt-16">
        <div className="flex flex-col gap-2">
          <Typography variant="h3" color="blue-gray" className="font-semibold">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="small" className="text-gray-500">
            {profile.bio}
          </Typography>
          <div className="flex gap-2">
            <Typography variant="small" className="text-gray-500">
              {profile.location}
            </Typography>
            <button
              onClick={() => setOpenContact(true)}
              className="text-blue-500 cursor-pointer flex items-center gap-1"
            >
              Contact Info <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex items-center gap-4 flex-wrap md:flex-nowrap pb-6 mt-4 relative">
        {connectionStatus === "connected" && (
          <>
            <Button color="blue" className="rounded-full w-[120px]">Message</Button>
            <MoreDropdown
              isOpen={isOpen}
              toggle={toggleDropdown}
              onRemove={handleRemoveConnection}
              onBlock={handleBlockAction}
              isBlocked={isBlocked}
            />
          </>
        )}

        {connectionStatus === "pending" && (
          <>
            <Button color="blue" className="rounded-full w-[120px]">Message</Button>
            <Button variant="outlined" color="blue-gray" className="rounded-full w-[120px]" disabled>
              ⏱ Pending
            </Button>
            <MoreDropdown
              isOpen={isOpen}
              toggle={toggleDropdown}
              onRemove={handleRemoveConnection}
              onBlock={handleBlockAction}
              isBlocked={isBlocked}
            />
          </>
        )}

        {connectionStatus === "waiting" && connectionId && (
          <>
            <AcceptConnection userId={connectionId} onSuccess={() => window.location.reload()} />
            <DeclineConnection userId={connectionId} onSuccess={() => window.location.reload()} />
            <MoreDropdown
              isOpen={isOpen}
              toggle={toggleDropdown}
              onRemove={handleRemoveConnection}
              onBlock={handleBlockAction}
              isBlocked={isBlocked}
            />
          </>
        )}

        {connectionStatus === "no connection" && (
          <>
            <ConnectButton userId={userid} token={token} />
            <Button 
  onClick={handleFollowWithoutConnecting}
  disabled={isLoading}
  color={isFollowing ? "gray" : "blue"} 
  variant={isFollowing ? "filled" : "outlined"} 
  className="rounded-full w-[120px]"
>
  {isLoading ? 'Processing...' : isFollowing ? 'Following' : 'Follow'}
</Button>
            <MoreDropdown
              isOpen={isOpen}
              toggle={toggleDropdown}
              onRemove={handleRemoveConnection}
              onBlock={handleBlockAction}
              isBlocked={isBlocked}
            />
          </>
        )}
      </CardFooter>

      {openContact && (
        <ViewContactInfo
          contactInfo={profile.contactInfo}
          onClose={() => setOpenContact(false)}
        />
      )}
    </Card>
  );
};

const MoreDropdown = ({ isOpen, toggle, onRemove, onBlock, isBlocked }) => (
  <div className="relative">
    <button
      onClick={toggle}
      className="inline-flex justify-center items-center min-w-[120px] rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      More
      <svg
        className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z" />
      </svg>
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-1 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          <button
            onClick={onRemove}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Remove Connection
          </button>
          <button
            onClick={onBlock}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            {isBlocked ? "Unblock User" : "Block User"}
          </button>
        </div>
      </div>
    )}
  </div>
);

export default ViewProfileCard;