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
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {connections.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">{connections.length} Connections</h2>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 border-b border-gray-400 focus:outline-none"
                >
                  <option>Recently added</option>
                  <option>First name</option>
                  <option>Last name</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search by name"
                className="pl-4 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded">
              Search with filters
            </button>
          </div>

          <div className="space-y-4">
            {filteredConnections.map((connection) => (
              <div key={connection.connectionId} className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <img
                    src={connection.profilePictureUrl || '/api/placeholder/60/60'}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {connection.firstName} {connection.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">{connection.headline}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Connected on {new Date(connection.connectedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 mr-2 rounded border border-blue-600">
                    Message
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
                    {/* Optional: icon or dropdown */}
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
  );
};

export default ConnectionsList;
