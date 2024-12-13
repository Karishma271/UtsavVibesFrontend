import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { TextField } from '@mui/material';

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      setError(''); // Reset error message
      const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com';
      const response = await axios.get(`${apiUrl}/api/users`);
      console.log('Fetched users:', response.data); // Log the fetched users for debugging
      setUsers(response.data); // Update the state with the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  
  // Filter the users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice the filtered users based on pagination
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>; // Display loading text if data is being fetched
  }

  return (
    <div className="user-management-page">
      <header>
        <h1>User Management</h1>
      </header>
      <nav>
        <TextField
          className='textField'
          label="Search by Name"
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </nav>
      <main>
        {error && <div className="error-message">{error}</div>} {/* Display error message if there is an error */}

        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="pagination">
            <ul>
              {Array(Math.ceil(filteredUsers.length / usersPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index + 1}>
                    <button onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default User;
