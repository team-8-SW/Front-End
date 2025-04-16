import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { searchUsers } from '../../services/api';

const UserSearch = ({ token }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    
    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
    
        if (value.length > 2) {
            setLoading(true);
            try {
                const params = { q: value }; // optional: add industry, company_id, etc.
                const response = await searchUsers(token, params);
                if(!response) {
                    setResults([]);
                } else{
                    setResults(response.users); // assuming response contains { users: [...] }
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        }
        
    };
    

    const handleSeeMore = () => {
        navigate('/SearchResults');
        setQuery('');
       setResults([]);
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
            {results.length > 0 ? (
                <div className="absolute bg-white text-black border rounded shadow-lg mt-1 w-full z-10">
                    <ul>
                        {results.slice(0, 5).map((user) => (
                            <li key={user.id} className="flex items-center p-2 hover:bg-gray-100 text-black">
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
            ) : (
                query.length > 2 && !loading && (
                    <div className="absolute bg-white border rounded shadow-lg mt-1 w-full z-10">
                        <div className="p-2 text-gray-500">No results found</div>
                    </div>
                )
            )}
        </div>
    );
};

export default UserSearch;