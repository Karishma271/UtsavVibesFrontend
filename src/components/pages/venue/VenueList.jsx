import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import './venueList.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';

const VenueList = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // Fetch venues from your API
    const fetchVenues = async () => {
      try {
        const response = await axios.get('/api/venues');
        setVenues(response.data);
      } catch (error) {
        console.error('Error loading Venue data:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div>
      <Typography variant="h1" fontSize="3rem" mb={4} gutterBottom>
        Venues
      </Typography>
      <div className="fp">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div className="fpItem" key={venue._id}>
              <Link to={`/fhalls/${venue._id}`}>
                <img
                  src={venue.imageUrl || '/images/default-venue.jpg'} 
                  alt={`${venue.venueName} hall`}
                  className="fpImg"
                />
              </Link>
              <span className="fpName">{venue.venueName}</span>
              <span className="fpCity"><LocationOnIcon /> {venue.address}</span>
              <span className="fpOccasion">Event: {venue.occasionType}</span>
              <span className="fpCapacity">Capacity: {venue.capacity || 'N/A'} <GroupsIcon /></span>
              {venue.acceptedPayments && venue.acceptedPayments.length > 0 && (
                <span className="fpPayments">
                  <PaymentIcon /> Accepted Payments: {venue.acceptedPayments.join(', ')}
                </span>
              )}
              <span className="fpDescription">{venue.description || 'No description available.'}</span>
            </div>
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
};

export default VenueList;
