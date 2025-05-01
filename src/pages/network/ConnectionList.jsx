import React, { useState, useEffect } from 'react';
import { getConnections } from '../../services/api';

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Recently added');

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const data = await getConnections();
      setConnections(data.connections);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch connections:', error);
      setLoading(false);
    }
  };

  const filteredConnections = connections.filter((connection) =>
    `${connection.firstName} ${connection.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.headline?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F2EF] min-h-screen">
      <div className="flex max-w-6xl mx-auto pt-6 px-4">
        {/* Connections Container */}
        <div className="w-2/3 mr-6">
          <div className="bg-white rounded-lg">
            {connections.length > 0 ? (
              <>
                <div className="p-4 pb-0">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {connections.length} {connections.length === 1 ? 'Connection' : 'Connections'}
                  </h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="mr-2 text-sm text-gray-600">Sort by:</div>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-transparent pr-6 py-1 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                      >
                        <option>Recently added</option>
                        <option>First name</option>
                        <option>Last name</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="relative flex-grow mr-4">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <button className="text-blue-600 font-medium text-sm hover:underline px-3 py-2 rounded">
                      Search with filters
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  {filteredConnections.map((connection) => (
                    <div key={connection.connectionId} className="flex items-center justify-between py-4 px-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={connection.profilePictureUrl || '/api/placeholder/60/60'}
                            alt={`${connection.firstName} ${connection.lastName}`}
                            className="w-12 h-12 rounded-full mr-3 object-cover bg-gray-100"
                          />
                          <div className="absolute bottom-0 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <svg
                              className="h-3 w-3 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">
                            {connection.firstName} {connection.lastName}
                          </h3>
                          <p className="text-gray-600 text-sm">{connection.headline}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Connected {Math.floor((new Date() - new Date(connection.connectedAt)) / (1000 * 60 * 60 * 24 * 7))} week{Math.floor((new Date() - new Date(connection.connectedAt)) / (1000 * 60 * 60 * 24 * 7)) !== 1 ? 's' : ''} ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 font-medium hover:bg-blue-50 px-5 py-1 rounded-full border border-blue-600 text-sm">
                          Message
                        </button>
                        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-100 rounded-lg opacity-30"></div>
                    <div className="relative bg-white p-4 rounded-lg border border-blue-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0077B5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">You don't have any connections yet.</h2>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Discover fresh ideas and jobs on LinkedIn through your connections and their networks. Find your first
                  connection below.
                </p>
              </div>
            )}
          </div>
        </div>

    
        <div className="w-1/3">
         
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xl font-semibold"></span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  unlock your full potential with LinkedIn Premium
                </p>
              </div>
              <button className="text-gray-600 p-1 rounded-full hover:bg-gray-200">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
            <p className="text-sm font-medium text-gray-800 mb-4">
              See who's viewed your profile in the last 365 days
            </p>
            <button className="w-full bg-white text-blue-600 text-sm font-medium py-2 rounded-full border border-blue-600">
              Try for free
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">Ad</p>
          </div>

         
          <div className="text-sm text-gray-600">
            <div className="flex flex-wrap justify-between mb-2">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Accessibility</a>
              <a href="#" className="hover:underline">Help Center</a>
            </div>
            <div className="flex flex-wrap justify-between mb-2">
              <div className="relative">
                <a href="#" className="hover:underline flex items-center">
                  Privacy & Terms
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
              <a href="#" className="hover:underline">Ad Choices</a>
            </div>
            <div className="flex flex-wrap justify-between mb-2">
              <a href="#" className="hover:underline">Advertising</a>
              <div className="relative">
                <a href="#" className="hover:underline flex items-center">
                  Business Services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mb-4">
              <a href="#" className="hover:underline">Get the LinkedIn app</a>
              <a href="#" className="hover:underline">More</a>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-blue-700 font-semibold mr-1">LinkedIn</span>
              <span>LinkedIn Corporation © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsList;