import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './venueList.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';

const VenueList = () => {
  const [venues, setVenues] = useState([]); // State to store fetched venues
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // Loading state

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com';

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/venues`);
        setVenues(response.data); // Set fetched data
      } catch (err) {
        console.error('Error loading venue data:', err);
        setError('Failed to load venue data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [apiUrl]);

  return (
    <div className="venue-list-container">
      <Typography variant="h2" fontSize="2.5rem" gutterBottom>
        Explore Venues
      </Typography>

      {/* Error Handling */}
      {error && (
        <Typography color="error" fontSize="1.2rem" marginBottom="1rem">
          {error}
        </Typography>
      )}

      {/* Loading State */}
      {loading && (
        <Typography variant="body1" fontSize="1.2rem">
          Loading venues...
        </Typography>
      )}

      {/* Venue Listing */}
      {!loading && venues.length > 0 ? (
        <div className="venues-grid">
          {venues.map((venue) => (
            <div className="venue-card" key={venue._id}>
              {/* Venue Image */}
              <Link to={`/fhalls/${venue._id}`}>
                <img
                  src={venue.imageUrl || '/images/placeholder.jpg'} // Fallback image
                  alt={`${venue.venueName}`}
                  className="venue-image"
                />
              </Link>

              {/* Venue Details */}
              <div className="venue-details">
                <Typography variant="h5" className="venue-title">
                  {venue.venueName}
                </Typography>

                <Typography variant="body2" className="venue-address">
                  <LocationOnIcon fontSize="small" /> {venue.address || 'Address not available'}
                </Typography>

                <Typography variant="body2" className="venue-occasion">
                  Event Type: {venue.occasionType || 'N/A'}
                </Typography>

                <Typography variant="body2" className="venue-capacity">
                  <GroupsIcon fontSize="small" /> Capacity: {venue.capacity || 'N/A'}
                </Typography>

                {venue.acceptedPayments?.length > 0 && (
                  <Typography variant="body2" className="venue-payments">
                    <PaymentIcon fontSize="small" /> Accepted Payments:{' '}
                    {venue.acceptedPayments.join(', ')}
                  </Typography>
                )}

                <Typography variant="body2" className="venue-description">
                  {venue.description || 'No description available.'}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <Typography variant="body1" fontSize="1.2rem">
            No venues available at the moment.
          </Typography>
        )
      )}
    </div>
  );
};

export default VenueList;
