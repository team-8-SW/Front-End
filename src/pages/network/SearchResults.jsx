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
                const users = await searchUsers(query, token);
                setResults(users);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query, token]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul className="space-y-4">
                    {results.map((user) => (
                        <li key={user.id} className="flex items-center justify-between p-2 border-b">
                            <div className="flex items-center">
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <span className="font-medium">{user.name}</span>
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