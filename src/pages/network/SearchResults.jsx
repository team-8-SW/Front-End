import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConnectButton from './ConnectButton';
import { searchUsers } from '../../services/api';

const SearchResults = ({ token }) => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await searchUsers(token, { q: query });
                setResults(response.users);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [token, query]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul className="space-y-4">
                    {results.map((user) => (
                        <li key={user.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </div>
                           <ConnectButton />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;