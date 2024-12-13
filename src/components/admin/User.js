// Usermgmt.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { TextField } from '@mui/material';

const Usermgmt = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com'; // Use environment variable
              const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const filteredUsers = currentUsers.filter((user) => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-management-page">
      <header>
        <h1>User Management</h1>
      </header>
      <nav>
        <TextField className='textField'
          label="Search by Names"
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
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {users.length > usersPerPage && (
            <ul>
              {Array(Math.ceil(users.length / usersPerPage))
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

export default Usermgmt;