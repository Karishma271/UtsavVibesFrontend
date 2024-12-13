import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { TextField } from '@mui/material';

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Use relative URL if backend and frontend are on the same server
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="pagination">
          {filteredUsers.length > usersPerPage && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default User;
