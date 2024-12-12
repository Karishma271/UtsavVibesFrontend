import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VenueList from './VenueList';  // Import the list component
import './Venue.css';  // Import the styles for this page

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      // Update the API URL to the live backend
      const response = await axios.get('https://utsavvibesbackend.onrender.com/api/venues');
      console.log('Fetched Venues:', response.data); // Add debugging logs
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  return (
    <div className="venue-page-container">
      <VenueList venues={venues} />
    </div>
  );
};

export default Venue;
