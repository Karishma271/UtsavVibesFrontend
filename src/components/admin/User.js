import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { TextField } from '@mui/material';

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
     try {
       setLoading(true); // Start loading
       setError(''); // Reset error
       const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com'; // Use environment variable
       const response = await axios.get(`${apiUrl}/api/users`);
       console.log('Fetched Users:', response.data); // Debugging logs
       setUsers(response.data); // Update state with fetched users
     } catch (error) {
       console.error('Error fetching users:', error);
       setError('Failed to fetch users. Please try again later.');
     } finally {
       setLoading(false); // Stop loading
     }
   };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-management-page">
      <header>
        <h1>User Management</h1>
      </header>
      <nav>
        <TextField
          className="textField"
          label="Search by Name"
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </nav>
      <main>
        {error && <div className="error-message">{error}</div>}

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

        {filteredUsers.length > usersPerPage && (
          <div className="pagination">
            <ul>
              {Array(Math.ceil(filteredUsers.length / usersPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index + 1}>
                    <button onClick={() => paginate(index + 1)}>{index + 1}</button>
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
