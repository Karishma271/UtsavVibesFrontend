import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './venueList.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';

const VenueList = () => {
  const [venues, setVenues] = useState([]); // State for storing venue list
  const [error, setError] = useState(null); // State for error handling
  const placeholderImage = '/images/placeholder.jpg'; // Placeholder for missing images

  useEffect(() => {
    // Fetch venues from the backend
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/venues`
        );
        setVenues(response.data); // Set fetched data to state
      } catch (err) {
        console.error('Error loading venue data:', err);
        setError('Failed to load venue data. Please try again later.');
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="venue-list-container">
      <Typography variant="h1" fontSize="3rem" mb={4} gutterBottom>
        Available Venues
      </Typography>

      {/* Show error message if data fails to load */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Check for venues */}
      {venues.length > 0 ? (
        <div className="venue-cards">
          {venues.map((venue) => (
            <div className="venue-card" key={venue._id}>
              {/* Venue Image */}
              <Link to={`/fhalls/${venue._id}`}>
                <img
                  src={venue.imageUrl || placeholderImage} // Use uploaded image or fallback
                  alt={`${venue.venueName} Venue`}
                  className="venue-image"
                />
              </Link>

              {/* Venue Name */}
              <Typography variant="h6" className="venue-name">
                {venue.venueName}
              </Typography>

              {/* Address */}
              <Typography variant="body2" className="venue-address">
                <LocationOnIcon /> {venue.address || 'Address not available'}
              </Typography>

              {/* Occasion Type */}
              <Typography variant="body2" className="venue-occasion">
                Event: {venue.occasionType || 'N/A'}
              </Typography>

              {/* Capacity */}
              <Typography variant="body2" className="venue-capacity">
                <GroupsIcon /> Capacity: {venue.capacity || 'N/A'}
              </Typography>

              {/* Accepted Payments */}
              {venue.acceptedPayments?.length > 0 && (
                <Typography variant="body2" className="venue-payments">
                  <PaymentIcon /> Accepted Payments: {venue.acceptedPayments.join(', ')}
                </Typography>
              )}

              {/* Description */}
              <Typography variant="body2" className="venue-description">
                {venue.description || 'No description available.'}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <Typography>No venues available at the moment.</Typography>
      )}
    </div>
  );
};

export default VenueList;
