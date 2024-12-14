import React from "react";
import "./listFeatured.css";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ListFeatured = () => {
  const navigate = useNavigate();
  const path = '/CheckoutPage';

  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract the ID from the URL path
  console.log('ID:', id); // Debugging log to check if the ID is correct

  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/api/halls/find/${id}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
