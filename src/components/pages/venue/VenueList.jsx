import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com';

  useEffect(() => {
    // Fetch all venues from the backend
    axios
      .get(`${apiUrl}/api/venues`)
      .then((response) => {
        setVenues(response.data); // Store venue data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching venues:', error);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  return (
    <div className="venue-list-container">
      <h2>Venue List</h2>
      {venues.length === 0 ? (
        <p>No venues available</p>
      ) : (
        <div className="venue-list">
          {venues.map((venue) => (
            <div key={venue._id} className="venue-card">
              <h3>{venue.venueName}</h3>
              {venue.imageUrl && (
                <img
                  src={venue.imageUrl}
                  alt={venue.venueName}
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              )}
              <p>{venue.description}</p>
              <Link to={`/venues/${venue._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueList;
