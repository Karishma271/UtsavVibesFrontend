import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './VenueForm.css';

const VenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occasionType: '',
    venueName: '',
    description: '',
    address: '',
    capacity: '',
    acceptedPayments: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Success/error feedback message

  const occasionTypeOptions = ['Wedding', 'Birthday', 'Conference', 'Party'];
  const paymentOptions = ['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'];

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com';

  // Fetch venue details if updating
  useEffect(() => {
    if (id) {
      axios
        .get(`${apiUrl}/api/venues/${id}`)
        .then((response) => {
          setFormData(response.data);
          setIsUpdateMode(true);
        })
        .catch((error) => console.error('Error fetching venue:', error));
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      acceptedPayments: selectedOptions,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const validateForm = () => {
    const { venueName, occasionType, address } = formData;
    if (!venueName.trim() || !occasionType || !address.trim()) {
      alert('Please fill in all required fields before submitting.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';

      // If an image is uploaded, handle image upload first
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('image', imageFile);
        const imageResponse = await axios.post(`${apiUrl}/api/upload-image`, imageData);
        imageUrl = imageResponse.data.imageUrl;
      }

      // Prepare updated form data
      const updatedData = { ...formData, imageUrl };

      // Update or create venue based on mode
      if (isUpdateMode) {
        await axios.put(`${apiUrl}/api/venues/${id}`, updatedData);
        setMessage('Venue updated successfully!');
      } else {
        await axios.post(`${apiUrl}/api/venues`, updatedData);
        setMessage('Venue added successfully!');
      }

      // Navigate back to the venue list after success
      setTimeout(() => navigate('/venues'), 2000);
    } catch (error) {
      console.error('Error saving/updating venue:', error);
      setMessage('An error occurred while saving the venue. Please try again.');
    } finally {
      setLoading(false);
      setImageFile(null); // Clear file input after submission
    }
  };

  return (
    <div className="venue-form-container">
      <h2>{isUpdateMode ? 'Update Venue' : 'Add Venue'}</h2>
      {message && <p className="form-message">{message}</p>}

      <form className="venue-form" onSubmit={handleSubmit}>
        {/* Occasion Type */}
        <label>Occasion Type:</label>
        <select name="occasionType" value={formData.occasionType} onChange={handleChange} required>
          <option value="">Select an occasion</option>
          {occasionTypeOptions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>

        {/* Venue Name */}
        <label>Venue Name:</label>
        <input type="text" name="venueName" value={formData.venueName} onChange={handleChange} required />

        {/* Description */}
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        {/* Address */}
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        {/* Capacity */}
        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />

        {/* Accepted Payments */}
        <label>Accepted Payments:</label>
        <select
          multiple
          name="acceptedPayments"
          value={formData.acceptedPayments}
          onChange={handlePaymentChange}
        >
          {paymentOptions.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Submit Button */}
        <button className="save-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isUpdateMode ? 'Update Venue' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;
