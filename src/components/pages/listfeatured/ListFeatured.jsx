import "./listFeatured.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ListFeatured = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  console.log("Extracted ID:", id); // Debug the extracted ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for ID: ${id}`); // Debug the request
        const response = await axios.get(`/halls/find/${id}`);
        console.log("API Response:", response.data); // Debug the API response
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading venue details</div>;

  return (
    <div>
      <div className="hallWrapper">
        <h1 className="hallTitle">{data.venueName}</h1>
        <div className="hallAddress">
          <span>
            <LocationOnIcon /> {data.address}
          </span>
        </div>
        <div className="hallImages">
          <div className="hallImgWrapper">
            <img
              src={data.imageUrl || "https://via.placeholder.com/300"} // Fallback image
              alt="Venue"
              className="hallImg"
            />
          </div>
        </div>
        <span className="fpName">
          {data.capacity || "N/A"} <GroupsIcon />
        </span>
        <div className="hallDetails">
          <div className="hallDetailsPrice">
            <h1>Description</h1>
            <span>{data.description || "No description available."}</span>
            <button onClick={() => navigate("/CheckoutPage")}>Book Now!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFeatured;
