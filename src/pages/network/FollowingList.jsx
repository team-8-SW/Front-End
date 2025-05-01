import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FollowingList = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState({
    followers: true,
    following: false
  });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Followers');
  const [updatingFollow, setUpdatingFollow] = useState(null); // Track which user is being updated
  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const userName = userData.name || 'Your Network';
  const token = localStorage.getItem('token');

  // API call to follow a user
  const handleFollow = async (userId) => {
    setUpdatingFollow(userId);
    try {
      await axios.post(
        `http://localhost:5000/api/following/users/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Update the followers list to remove the followed user
      setFollowers(prev => prev.filter(user => user.id !== userId));
      // Add to following list if we're on that tab
      if (activeTab === 'Following') {
        const userToAdd = followers.find(user => user.id === userId);
        if (userToAdd) {
          setFollowing(prev => [...prev, userToAdd]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to follow user');
    } finally {
      setUpdatingFollow(null);
    }
  };

  // Fetch followers data
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/following/followers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowers(response.data);
        setLoading(prev => ({ ...prev, followers: false }));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch followers');
        setLoading(prev => ({ ...prev, followers: false }));
      }
    };

    fetchFollowers();
  }, [token]);

  // Fetch following data
  const fetchFollowing = async () => {
    try {
      setLoading(prev => ({ ...prev, following: true }));
      const response = await axios.get(`http://localhost:5000/api/following/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 404) {
        setFollowing([]);
      } else {
        const followingData = Array.isArray(response.data) ? response.data : [response.data];
        setFollowing(followingData);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setFollowing([]);
      } else {
        setError(err.response?.data?.error || 'Failed to fetch following');
      }
    } finally {
      setLoading(prev => ({ ...prev, following: false }));
    }
  };

  // Handle tab changes
  useEffect(() => {
    if (activeTab === 'Following') {
      fetchFollowing();
    }
  }, [activeTab]);

  const isLoading = activeTab === 'Followers' ? loading.followers : loading.following;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F2EF]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-[#F3F2EF]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const displayedList = activeTab === 'Followers' ? followers : following;

  return (
    <div className="min-h-screen bg-[#F3F2EF] flex justify-center">
      <div className="max-w-6xl w-full flex flex-row py-8 px-4 gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-900">{userName}</h1>
              <div className="flex space-x-4 mt-2">
                <button
                  className={`text-sm font-medium pb-2 ${
                    activeTab === 'Following'
                      ? 'text-gray-700 border-b-2 border-gray-700'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('Following')}
                >
                  Following
                </button>
                <button
                  className={`text-sm font-medium pb-2 ${
                    activeTab === 'Followers'
                      ? 'text-gray-700 border-b-2 border-gray-700'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('Followers')}
                >
                  Followers
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'Followers'
                  ? `${followers.length} ${followers.length === 1 ? 'person is' : 'people are'} following you`
                  : `You're following ${following.length} ${following.length === 1 ? 'person' : 'people'}`}
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {displayedList.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {activeTab === 'Followers'
                      ? "You don't have any followers yet."
                      : "You're not following anyone yet."}
                  </p>
                </div>
              ) : (
                displayedList.map((person) => (
                  <div key={person.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {person.profilePictureUrl ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.profilePictureUrl}
                            alt={`${person.firstName} ${person.lastName}`}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {person.firstName?.charAt(0)}
                              {person.lastName?.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{person.headline || 'No headline'}</p>
                      </div>
                    </div>
                    {activeTab === 'Followers' ? (
                      <button 
                        onClick={() => handleFollow(person.id)}
                        disabled={updatingFollow === person.id}
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          updatingFollow === person.id
                            ? 'bg-gray-200 text-gray-500'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {updatingFollow === person.id ? 'Following...' : 'Follow back'}
                      </button>
                    ) : (
                      <button className="px-4 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Following
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 flex flex-col gap-6">
          {/* Ad Banner */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            
            <div className="p-4">
              <img
                src="/photos/image.png"
                alt="See who's hiring on LinkedIn"
                className="h-60 w-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* LinkedIn Premium Ad */}
          <div className="bg-white rounded-lg shadow-sm">
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                {userName}, unlock your full potential with LinkedIn Premium
              </h3>
              <div className="flex items-center mb-4">
                <div className="bg-[#FFEECC] text-[#915907] px-2 py-1 rounded-full text-xs font-bold mr-2">
                  Premium
                </div>
                <p className="text-sm text-gray-600">
                  See who's viewed your profile in the last 365 days
                </p>
              </div>
              <button className="w-full bg-[#0A66C2] text-white font-bold py-2 px-4 rounded-full mb-4 hover:bg-[#004182] transition">
                Try for free
              </button>
              <h4 className="font-semibold text-md mb-2">Get hired faster with Premium</h4>
              <p className="text-sm text-gray-600 mb-4">
                Premium InMail is 4.6x more effective in hearing back than cold email.
              </p>
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2 mr-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                    U1
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                    U2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Accessibility</a>
              <a href="#" className="hover:underline">Help Center</a>
              <a href="#" className="hover:underline">Privacy & Terms</a>
              <a href="#" className="hover:underline">Ad Choices</a>
              <a href="#" className="hover:underline">Advertising</a>
              <a href="#" className="hover:underline">Business Services</a>
              <a href="#" className="hover:underline">Get the LinkedIn app</a>
              <a href="#" className="hover:underline">More</a>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-blue-700 font-semibold">LinkedIn</span>
              <span className="ml-1 text-gray-600">Corporation © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingList;