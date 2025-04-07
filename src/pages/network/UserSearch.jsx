import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../../services/api';

const UserSearch = ({token}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 2) {
            setLoading(true);
            try {
                const users = await searchUsers(e.target.value, token);
                setResults(users);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleSeeMore = () => {
       navigate ('/SearchResults');
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search"
                className="h-[34px] hidden sm:block sm:w-40 lg:w-60 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading && <div>Loading...</div>}
            {results.length > 0 && (
                <div className="absolute bg-white border rounded shadow-lg mt-1 w-full z-10">
                    <ul>
                        {results.slice(0, 5).map((user) => (
                            <li key={user.id} className="flex items-center p-2 hover:bg-gray-100">
                                <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                                <span>{user.name}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleSeeMore}
                        className="w-full text-blue-500 hover:underline p-2"
                    >
                        See More
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserSearch;