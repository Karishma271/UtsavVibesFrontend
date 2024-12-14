import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useFetch from '../../hooks/useFetch'; // Import the useFetch hook
import './listFeatured.css';

const ListFeatured = () => {
  const navigate = useNavigate();
  const path = '/CheckoutPage';
  const location = useLocation();
  const id = location.pathname.split("/")[2];  // Get the venue ID from the URL

  // Use the custom useFetch hook to get data from the backend
  const { data, error } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/halls/find/${id}`);

  if (error) {
    return <div>Error: {error}</div>;  // Handle errors here
  }

  if (!data) {
    return <div>Loading...</div>;  // Show loading while data is being fetched
  }

  return (
    <div>
      <div className="hallWrapper">
        <h1 className="hallTitle">{data.venueName}</h1>
        <div className="hallAddress">
          <span><LocationOnIcon /> {data.address}</span>
        </div>
        <div className="hallImages">
          <div className="hallImgWrapper">
            <img src={data.imageUrl} alt="Venue" className="hallImg" />
          </div>
        </div>
        <span className="fpName">{data.capacity} <GroupsIcon /></span>
        <div className="hallDetails">
          <div className="hallDetailsPrice">
            <h1>Description</h1>
            <span>{data.description}</span>
            <button onClick={() => navigate(path)}>Book Now!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFeatured;
